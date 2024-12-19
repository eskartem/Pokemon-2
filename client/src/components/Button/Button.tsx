import React from 'react';
import cn from 'classnames';

import './Button.scss';

export type TButton = {
    id?: string;
    variant?: string;
    isHover?: boolean;
    className?: string;
    text?: string;
    onClick: (a: any) => void;
    isDisabled?: boolean;
}

const Button: React.FC<TButton> = (props: TButton) => {
    const {
        id,
        variant = 'main',
        isHover = false,
        className,
        text = 'No Text',
        onClick = () => { },
        isDisabled = false,
    } = props;

    return (<button
        id = {id}
        className={cn('button', `button-${variant}`, className, { 'hover': isHover, 'disabled': isDisabled })}
        onClick={onClick}
    >
        {text}
    </button>);
}

export default Button;