import React from 'react'

const BlurredOverlayLabel = ({ title, analytic = "", link = "/", top = 0, right = 0 }) => {
    return (
        <div className={`absolute ${top} ${right} flex items-center gap-4`}>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-white text-sm">{title}</span>
                <span className="text-secondary font-bold">{analytic}</span>
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs font-bold">↗</span>
                </div>
            </div>
        </div>
    )
}

export default BlurredOverlayLabel