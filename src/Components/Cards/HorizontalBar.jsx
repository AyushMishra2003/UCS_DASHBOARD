import React from 'react';
import { Tooltip } from 'react-tooltip';

const HorizontalBar = ({ labels, data, colors }) => {
    const total = data.reduce((acc, value) => acc + value, 0);

    return (
        <div className="relative flex items-center w-full mt-4 rounded-full">
            {data.map((value, index) => {
                const percentage = ((value / total) * 100).toFixed(1);
                return (
                    <div
                        key={index}
                        data-tooltip-id={`tooltip-${index}`}
                        data-tooltip-content={`${labels[index]}: ${value} (${percentage}%)`}
                        className="relative h-4"
                        style={{
                            width: `${percentage}%`,
                            backgroundColor: colors[index],
                            cursor: 'pointer',
                            position: 'relative',
                            borderTopLeftRadius: index === 0 ? '10px' : '0',
                            borderBottomLeftRadius: index === 0 ? '10px' : '0',
                            borderTopRightRadius: index === data.length - 1 ? '10px' : '0',
                            borderBottomRightRadius: index === data.length - 1 ? '10px' : '0',
                        }}
                    >
                        <Tooltip id={`tooltip-${index}`} place="top" />
                        <span className="absolute text-xs font-semibold text-white transform -translate-x-1/2 left-1/2">
                            {percentage}%
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default HorizontalBar;
