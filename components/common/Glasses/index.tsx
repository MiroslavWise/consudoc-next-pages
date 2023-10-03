const glasses = [1, 2, 3, 4]

export const Glasses = () =>
    glasses.map((item) => (
        <div className={`glass-circle-${item}`} key={`glass-circle-${item}_modal-sign`} />
    ))
