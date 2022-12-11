
import React from 'react'
import styles from '../styles/TrackProgress.module.sass'

interface ITrackProgressProps {
    left: number
    right: number
    onChange: (e:any) => void
}
const TrackProgress:React.FC<ITrackProgressProps> = ({left, right, onChange}) => {

    const changeCuttentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        onChange(value)
    }

    const toTime = (val:number) => {
        const h = Math.floor(val/3600)
        const m = Math.floor((val%3600)/60)
        const s = Math.floor(val%60)
        const format = (v:number) => (v < 10 ? `0${v}` : `${v}`)
        return (`${format(h)}:${format(m)}:${format(s)}`)
    }
    return (
        <div className={styles.container}>
            <input 
                type='range'
                min={0}
                max={right}
                value={left}
                onChange={changeCuttentTime}
                width={500}
            />
            <p>{toTime(left)} / {toTime(right)}</p>
        </div>
    )
}

export default TrackProgress