"use client"

import {
    type FC,
    type ReactNode,
    type Dispatch,
    createContext,
    useEffect,
    useState,
    useMemo,
    useRef,
} from "react"
const { v4: uuidv4 } = require("uuid")

import { Janus } from "@/scripts/janus"
import { useProfile } from "@/store/state"
import { useWeb } from "./useWebSocket"
import { requestPOST } from "@/services/general-api"
import { useCallJanus, usePropsCallingJanus } from "@/store/state/useCallJanus"
import { apiToConfInfo } from "@/services/apiCallJanus"
import { ModalCallingJanus } from "@/components/Janus"
import { useFeedback } from "@/store/state/useFeedback"
import { switchStatus } from "@/services/doctors"

interface IPropsAudioVideo {
    isAudio: boolean
    isVideo: boolean
}

type IJanus =
    | {
          visible: boolean
          videocall: any
          createRoom: (value: number) => Promise<any>
          joinAndVisible: Dispatch<number>
          publishOwnFeed: (value: { useAudio: boolean; useVideo: boolean }) => void
      }
    | undefined

type TProps = FC<{ children: ReactNode }>

export const CreateJanusContext = createContext<IJanus>(undefined)

var videocall: any = null
var janus: any = null
var jsep: any
var trackId: any = null
var tracks: any = null
var doctor_id: any = null
var patient_id: any = null
var uuid_conf: any = null
var doSimulcast = false
var janus = null
var sfutest: any = null
var stream: any
var myusername: any = null
var myid: any = null
var mystream: any = null
var myRoomId: any = null
var mypvtid: any = null
var localTracks: any = {},
    localVideos = 0
var feeds: any[] = [],
    feedStreams: any = {}
var doSimulcast =
    getQueryStringValue("simulcast") === "yes" || getQueryStringValue("simulcast") === "true"
var acodec = getQueryStringValue("acodec") !== "" ? getQueryStringValue("acodec") : null
var vcodec = getQueryStringValue("vcodec") !== "" ? getQueryStringValue("vcodec") : null
var doDtx = getQueryStringValue("dtx") === "yes" || getQueryStringValue("dtx") === "true"
var subscriber_mode =
    getQueryStringValue("subscriber-mode") === "yes" ||
    getQueryStringValue("subscriber-mode") === "true"
var use_msid = getQueryStringValue("msid") === "yes" || getQueryStringValue("msid") === "true"
var remoteFeed: any

export const ContextJanusVideoRoom: TProps = ({ children }) => {
    const { wsChannel } = useWeb() ?? {}
    const { isDoctor, profile } = useProfile() ?? {}
    const [visible, setVisible] = useState<boolean>(false)
    const [isJanus, setIsJanus] = useState<boolean>(false)
    const [doSvc, setDoSvc] = useState("")
    const { deleteTime, setTime } = useCallJanus()
    const refVideoLeft = useRef<HTMLDivElement>(null)
    const refVideoRight = useRef<HTMLDivElement>(null)
    const uuid = useMemo(() => uuidv4(), [])
    const close = useRef<boolean>(false)
    const isTimer = useRef<boolean>(false)
    const { setIsVisible } = useFeedback()

    const {
        call_info,
        doctor_info,
        user_info,
        setCallInfo,
        setDoctorInfo,
        setUserInfo,
        idRoom: idRoomState,
        setIdRoom,
        setUuidRoom,
        deleteAll,
        uuidRoom,
    } = usePropsCallingJanus()

    useEffect(() => {
        setDoSvc(getQueryStringValue("svc"))
        setTimeout(() => {
            if (call_info?.uuid) {
                apiToConfInfo(call_info.uuid).then((response) => {
                    if (response?.res?.status === "CALL_ONLINE") {
                        console.log("conf_id: response?.res?.id: ", response?.res?.id)
                        joinInVideoRoom(Number(response?.res?.id)).finally(() => {
                            requestAnimationFrame(() => {
                                publishOwnFeed({
                                    useAudio: true,
                                    useVideo: true,
                                })
                                setVisible(true)
                            })
                        })
                    }
                })
            } else {
                deleteAll()
            }
        }, 1000)
    }, [])

    useEffect(() => {
        if (call_info) {
            uuid_conf = call_info?.uuid
            myRoomId = Number(call_info?.conf_id)
        }
        if (doctor_info) {
            doctor_id = doctor_info?.doctor_id
        }
        if (user_info) {
            patient_id = user_info?.profile_id
        }
    }, [call_info, doctor_info, user_info])

    useEffect(() => {
        if (profile) {
            myusername = profile?.profile_id
        }
        if (profile && idRoomState && isJanus) {
            if (!myRoomId) {
                myRoomId = Number(idRoomState)
            }
        }
    }, [profile, isJanus, idRoomState])

    useEffect(() => {
        const listenerCall = (event: any) => {
            const notification = JSON.parse(event.data).data
            console.log("---notification idRoom: ", notification)
            if (notification?.type === "call_accept_ok") {
                setCallInfo(notification.call_info)
                setDoctorInfo(notification.doctor_info)
                setUserInfo(notification.user_info)
                setUuidRoom(notification.call_info.conf_uuid)
                setTime()
                if (!isDoctor) {
                    joinAndVisible(Number(notification.call_info.conf_id!))
                }
            }
            if (notification?.data?.type === "closing_videoroom") {
                setVisible(false)
                closeVideoCallTalk()
                unpublishOwnFeed()
                deleteTime()
                if (isDoctor) {
                    switchStatus("online")
                }
                setIsVisible(true)
            }
        }
        if (wsChannel) {
            wsChannel?.addEventListener("message", listenerCall)
        }

        return () => wsChannel?.removeEventListener("message", listenerCall)
    }, [wsChannel, isDoctor, uuidRoom])

    useEffect(() => {
        Janus.init({
            debug: false,
            callback: function () {
                janus = new Janus({
                    server: process.env.NEXT_PUBLIC_URL_WEBSOCKET_JANUS,
                    success: async function () {
                        janus.attach({
                            plugin: "janus.plugin.videoroom",
                            opaqueId: uuid,
                            success: function (pluginHandle: any) {
                                sfutest = pluginHandle
                                videocall = pluginHandle
                                setIsJanus(true)
                            },
                            error: function (error: any) {
                                console.info("---ERROR---", error)
                            },
                            consentDialog: function (on: any) {
                                if (on) {
                                } else {
                                }
                            },
                            iceState: function (state: any) {},
                            mediaState: function (medium: any, on: any, mid: any) {},
                            webrtcState: function (on: any) {},
                            slowLink: function (uplink: any, lost: any, mid: any) {},
                            onmessage: function (msg: any, jsep: any) {
                                let event = msg["videoroom"]
                                if (event) {
                                    if (event === "joined") {
                                        myid = msg["id"]
                                        mypvtid = msg["private_id"]
                                        if (msg["publishers"]) {
                                            let list = msg["publishers"]
                                            for (let f in list) {
                                                if (list[f]["dummy"]) continue
                                                let id = list[f]["id"]
                                                let streams = list[f]["streams"]
                                                let display = list[f]["display"]
                                                for (let i in streams) {
                                                    let stream = streams[i]
                                                    stream["id"] = id
                                                    stream["display"] = display
                                                }
                                                feedStreams[id] = streams
                                                newRemoteFeed(
                                                    id,
                                                    display,
                                                    streams,
                                                    uuid,
                                                    Number(myRoomId)
                                                )
                                            }
                                        }
                                    } else if (event === "destroyed") {
                                    } else if (event === "event") {
                                        if (msg["streams"]) {
                                            let streams = msg["streams"]
                                            for (let i in streams) {
                                                let stream = streams[i]
                                                stream["id"] = myid
                                                stream["display"] = `${
                                                    isDoctor ? "doctor" : "patient"
                                                }-${myusername}`
                                            }
                                            feedStreams[myid] = streams
                                        } else if (msg["publishers"]) {
                                            let list = msg["publishers"]
                                            for (let f in list) {
                                                if (list[f]["dummy"]) continue
                                                let id = list[f]["id"]
                                                let display = list[f]["display"]
                                                let streams = list[f]["streams"]
                                                for (let i in streams) {
                                                    let stream = streams[i]
                                                    stream["id"] = id
                                                    stream["display"] = display
                                                }
                                                feedStreams[id] = streams
                                                newRemoteFeed(
                                                    id,
                                                    display,
                                                    streams,
                                                    uuid,
                                                    Number(myRoomId)
                                                )
                                            }
                                        } else if (msg["leaving"]) {
                                            let leaving = msg["leaving"]
                                            let remoteFeed = null
                                            for (let i = 1; i < 6; i++) {
                                                if (feeds[i] && feeds[i].rfid == leaving) {
                                                    remoteFeed = feeds[i]
                                                    break
                                                }
                                            }
                                            if (remoteFeed) {
                                                //---------------------------------------------------------------
                                                // $('#remote'+remoteFeed.rfindex).empty().hide();
                                                // $('#videoremote'+remoteFeed.rfindex).empty();
                                                //----------------
                                                feeds[remoteFeed.rfindex] = null
                                                remoteFeed.detach()
                                            }
                                            delete feedStreams[leaving]
                                        } else if (msg["unpublished"]) {
                                            let unpublished = msg["unpublished"]
                                            if (unpublished === "ok") {
                                                // sfutest.hangup()
                                                if (refVideoLeft.current) {
                                                    refVideoLeft.current.innerHTML = ""
                                                }
                                            }
                                            let remoteFeed = null
                                            for (let i = 1; i < 6; i++) {
                                                if (feeds[i] && feeds[i].rfid == unpublished) {
                                                    remoteFeed = feeds[i]
                                                    break
                                                }
                                            }
                                            if (remoteFeed) {
                                                feeds[remoteFeed.rfindex] = null
                                                remoteFeed.detach()
                                            }
                                            delete feedStreams[unpublished]
                                        } else if (msg["error"]) {
                                            console.info("---ERROR---", msg["error"])
                                        }
                                    }
                                }
                                if (jsep) {
                                    sfutest.handleRemoteJsep({ jsep: jsep })
                                    let audio = msg["audio_codec"]
                                    if (
                                        mystream &&
                                        mystream.getAudioTracks() &&
                                        mystream.getAudioTracks().length > 0 &&
                                        !audio
                                    ) {
                                    }
                                    let video = msg["video_codec"]
                                    if (
                                        mystream &&
                                        mystream.getVideoTracks() &&
                                        mystream.getVideoTracks().length > 0 &&
                                        !video
                                    ) {
                                    }
                                }
                            },
                            onlocaltrack: function (track: any, on: any) {
                                let trackId = track.id.replace(/[{}]/g, "")
                                if (!on) {
                                    let stream = localTracks[trackId]
                                    if (stream) {
                                        try {
                                            let tracks = stream.getTracks()
                                            for (let i in tracks) {
                                                let mst = tracks[i]
                                                if (mst !== null && mst !== undefined)
                                                    mst.stop()
                                            }
                                        } catch (e) {}
                                    }
                                    if (track.kind === "video") {
                                        if (refVideoLeft.current) {
                                            refVideoLeft.current.getElementsByTagName(
                                                "video"
                                            )[0].style.display = "none"
                                        }
                                        localVideos--
                                        if (localVideos === 0) {
                                        }
                                    }
                                    delete localTracks[trackId]
                                    return
                                }
                                let stream = localTracks[trackId]
                                if (stream) {
                                    return
                                }
                                if (track.kind === "audio") {
                                    if (localVideos === 0) {
                                    }
                                } else {
                                    localVideos++
                                    stream = new MediaStream([track])
                                    localTracks[trackId] = stream
                                    const newElementVideo = document.createElement("video")
                                    newElementVideo.className = "rounded centered peervideo"
                                    newElementVideo.id = `myvideo${trackId}`
                                    newElementVideo.style.width = "100%"
                                    newElementVideo.style.height = "100%"
                                    newElementVideo.autoplay = true
                                    newElementVideo.playsInline = true
                                    newElementVideo.muted = true
                                    refVideoLeft.current?.appendChild(newElementVideo)
                                    Janus.attachMediaStream(
                                        document.getElementById(`myvideo${trackId}`),
                                        stream
                                    )
                                }
                            },
                            onremotetrack: function (track: any, mid: any, on: any) {},
                            oncleanup: function () {
                                mystream = null
                                delete feedStreams[myid]
                                localTracks = {}
                                localVideos = 0
                            },
                        })
                    },
                    error: function (error: any) {
                        console.log("error : ", error)
                    },
                    destroyed: function () {
                        // window.location.reload();
                    },
                })
            },
        })

        return () => {}
    }, [])

    function publishOwnFeed({ useAudio, useVideo }: { useAudio: boolean; useVideo: boolean }) {
        let tracks = []
        if (useAudio) {
            tracks.push({
                type: "audio",
                capture: true,
                recv: false,
            })
        }
        if (useVideo) {
            tracks.push({
                type: "video",
                capture: true,
                recv: false,
                simulcast: doSimulcast,
                svc: (vcodec === "vp9" || vcodec === "av1") && doSvc ? doSvc : null,
            })
        }
        sfutest.createOffer({
            tracks: tracks,
            customizeSdp(jsep: any) {
                if (doDtx) {
                    jsep.sdp = jsep.sdp.replace("useinbandfec=1", "useinbandfec=1;usedtx=1")
                }
            },
            success(jsep: any) {
                let publish: any = {
                    request: "configure",
                    audio: useAudio,
                    video: useVideo,
                    room: Number(call_info?.conf_id!),
                    record: true,
                    filename: `/opt/janus/share/janus/recordings/${
                        isDoctor ? doctor_id : patient_id
                    }-${uuid_conf}`,
                }
                if (acodec) {
                    if (useAudio) {
                        publish["audiocodec"] = acodec
                    }
                }
                if (vcodec) {
                    if (useVideo) {
                        publish["videocodec"] = vcodec
                    }
                }
                sfutest.send({ message: publish, jsep: jsep })
            },
            error(error: any) {
                console.log("---publishOwnFeed error track --- ", error)
            },
        })
    }

    function doHangup() {
        wsChannel?.send(
            JSON.stringify({
                data: {
                    type: "closing_videoroom",
                    id_room: Number(myRoomId),
                    id_interviewee: !isDoctor ? doctor_id : patient_id,
                    patient_id: patient_id,
                    doctor_id: doctor_id,
                },
            })
        )
    }

    async function closeVideoCallTalk() {
        return await requestPOST(`conference/done/`, {
            conf_uuid: call_info?.uuid!,
            status: "CALL_END",
            completed: isTimer.current || true,
        }).then((data) => {
            console.log("Success Call End:  ", data?.res)
            close.current = false
            return data?.res
        })
    }

    function updatedVideoAudio({ isAudio, isVideo }: IPropsAudioVideo) {
        sfutest.send({
            request: "unsubscribe",
            streams: [],
        })
    }

    function unpublishOwnFeed() {
        let unpublish = { request: "unpublish" }
        sfutest.send({ message: unpublish })
    }

    const joinInVideoRoom = async (idRoom: number) => {
        console.log("---joinInVideoRoom idRoom: ", idRoom)
        return await sfutest.send({
            message: {
                request: "join",
                ptype: "publisher",
                display: `${isDoctor ? "doctor" : "patient"}-${myusername}`,
                room: Number(idRoom),
            },
        })
    }

    function joinAndVisible(idRoom: number) {
        console.log("---joinAndVisible idRoom: ", idRoom)
        setIdRoom(Number(idRoom))
        joinInVideoRoom(Number(idRoom)).finally(() => {
            requestAnimationFrame(() => {
                publishOwnFeed({ useAudio: true, useVideo: true })
                setVisible(true)
            })
        })
    }

    function newRemoteFeed(
        id: any,
        display: any,
        streams: any,
        opaqueId: any,
        idRoom: number
    ) {
        let remoteFeed: any = null
        if (!streams) streams = feedStreams[id]
        janus.attach({
            plugin: "janus.plugin.videoroom",
            opaqueId: opaqueId,
            success: function (pluginHandle: any) {
                remoteFeed = pluginHandle
                remoteFeed.remoteTracks = {}
                remoteFeed.remoteVideos = 0
                remoteFeed.simulcastStarted = false
                remoteFeed.svcStarted = false
                let subscription = []
                for (let i in streams) {
                    let stream = streams[i]
                    subscription.push({
                        feed: stream.id,
                        mid: stream.mid,
                    })
                    remoteFeed.rfid = stream.id
                    remoteFeed.rfdisplay = escapeXmlTags(stream.display)
                }
                let subscribe = {
                    request: "join",
                    room: idRoom,
                    ptype: "subscriber",
                    streams: subscription,
                    use_msid: use_msid,
                }
                remoteFeed.send({ message: subscribe })
            },
            error: function (error: any) {
                console.log("---ERROR newRemoteFeed---", error)
            },
            iceState: function (state: any) {},
            webrtcState: function (on: any) {},
            slowLink: function (uplink: any, lost: any, mid: any) {},
            onmessage: function (msg: any, jsep: any) {
                let event = msg["videoroom"]
                if (msg["error"]) {
                } else if (event) {
                    if (event === "attached") {
                        for (let i = 1; i < 6; i++) {
                            if (!feeds[i]) {
                                feeds[i] = remoteFeed
                                remoteFeed.rfindex = i
                                break
                            }
                        }
                        if (!remoteFeed.spinner) {
                            let target = document.getElementById(
                                "videoremote" + remoteFeed.rfindex
                            )
                        } else {
                            remoteFeed.spinner.spin()
                        }
                        //------------------------------------------------------------------------------------------------------
                        // $('#remote' + remoteFeed.rfindex).removeClass('hide').html(remoteFeed.rfdisplay).show();
                        //------------------------------------------------------------------------------------------------------
                    } else if (event === "event") {
                        let substream = msg["substream"]
                        let temporal = msg["temporal"]
                        if (
                            (substream !== null && substream !== undefined) ||
                            (temporal !== null && temporal !== undefined)
                        ) {
                            if (!remoteFeed.simulcastStarted) {
                                remoteFeed.simulcastStarted = true
                            }
                        }
                        // Or maybe SVC?
                        let spatial = msg["spatial_layer"]
                        temporal = msg["temporal_layer"]
                        if (
                            (spatial !== null && spatial !== undefined) ||
                            (temporal !== null && temporal !== undefined)
                        ) {
                            if (!remoteFeed.svcStarted) {
                                remoteFeed.svcStarted = true
                            }
                        }
                    } else {
                    }
                }
                if (jsep) {
                    let stereo = jsep.sdp.indexOf("stereo=1") !== -1
                    remoteFeed.createAnswer({
                        jsep: jsep,
                        tracks: [{ type: "data" }],
                        customizeSdp: function (jsep: any) {
                            if (stereo && jsep.sdp.indexOf("stereo=1") == -1) {
                                jsep.sdp = jsep.sdp.replace(
                                    "useinbandfec=1",
                                    "useinbandfec=1;stereo=1"
                                )
                            }
                        },
                        success: function (jsep: any) {
                            let body = { request: "start", room: idRoom }
                            remoteFeed.send({ message: body, jsep: jsep })
                        },
                        error: function (error: any) {
                            console.log("---ERRROR error---", error)
                        },
                    })
                }
            },
            onlocaltrack: function (track: any, on: any) {},
            onremotetrack: function (track: any, mid: any, on: any, metadata: any) {
                if (!on) {
                    if (track.kind === "video") {
                        remoteFeed.remoteVideos--
                        if (remoteFeed.remoteVideos === 0) {
                        }
                    }
                    delete remoteFeed.remoteTracks[mid]
                    return
                }
                // If we're here, a new track was added
                if (remoteFeed.spinner) {
                    remoteFeed.spinner.stop()
                    remoteFeed.spinner = null
                }
                if (track.kind === "audio") {
                    let stream = new MediaStream([track])
                    remoteFeed.remoteTracks[mid] = stream
                    const newAudioElement = document.createElement("audio")
                    newAudioElement.className = "hide"
                    newAudioElement.id = `remotevideo${remoteFeed.rfindex}-${mid}`
                    newAudioElement.autoplay = true
                    refVideoRight.current?.appendChild(newAudioElement)
                    Janus.attachMediaStream(
                        document.getElementById(`remotevideo${remoteFeed.rfindex}-${mid}`),
                        stream
                    )
                    if (remoteFeed.remoteVideos === 0) {
                    }
                } else {
                    remoteFeed.remoteVideos++
                    let stream = new MediaStream([track])
                    remoteFeed.remoteTracks[mid] = stream
                    const newElementVideo = document.createElement("video")
                    newElementVideo.className = "rounded centered peervideo"
                    newElementVideo.id = `remotevideo${remoteFeed.rfindex}-${mid}`
                    newElementVideo.style.width = "100%"
                    newElementVideo.style.height = "100%"
                    newElementVideo.autoplay = true
                    newElementVideo.playsInline = true
                    newElementVideo.muted = true
                    refVideoRight.current?.appendChild(newElementVideo)
                    Janus.attachMediaStream(
                        document.getElementById(`remotevideo${remoteFeed.rfindex}-${mid}`),
                        stream
                    )
                }
            },
            oncleanup: function () {
                if (remoteFeed.spinner) remoteFeed.spinner.stop()
                remoteFeed.spinner = null
                remoteFeed.simulcastStarted = false
                remoteFeed.remoteTracks = {}
                remoteFeed.remoteVideos = 0
            },
        })
    }

    async function createRoom(idRoom: number) {
        console.log("---createRoom idRoom: ", idRoom)
        return await sfutest.send({
            message: {
                request: "create",
                room: Number(idRoom),
            },
        })
    }

    return (
        <CreateJanusContext.Provider
            value={{
                visible: visible,
                videocall: sfutest,
                createRoom: createRoom,
                joinAndVisible: joinAndVisible,
                publishOwnFeed: publishOwnFeed,
            }}
        >
            {children}
            <ModalCallingJanus
                visible={visible}
                videocall={sfutest}
                doHangup={doHangup}
                refVideoLeft={refVideoLeft!}
                refVideoRight={refVideoRight!}
                publishOwnFeed={publishOwnFeed}
                updatedVideoAudio={updatedVideoAudio}
            />
        </CreateJanusContext.Provider>
    )
}

function getQueryStringValue(name: string) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    if (typeof window === "undefined") {
        return name
    }
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(window.location.search)
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}

function escapeXmlTags(value: string) {
    if (value) {
        let escapedValue = value.replace(new RegExp("<", "g"), "&lt")
        escapedValue = escapedValue.replace(new RegExp(">", "g"), "&gt")
        return escapedValue
    }
}
