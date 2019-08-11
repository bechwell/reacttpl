import React from 'react'

export default function Loading() {
    return (
        <div style={
            {
                position: 'absolute',
                left: 0, top: 0, right: 0, bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.5)'
            }
        }
        >
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
