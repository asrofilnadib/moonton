import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

forwardRef.PropTypes = {
    type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'date', 'datetime-local', 'month', 'search', 'tel', 'time', 'url', 'week']),
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'error', 'primary-outline']),
    autocomplete: PropTypes.string,
    required: PropTypes.bool,
    isFocused: PropTypes.bool,
    handleChange: PropTypes.func,
    placeholder: PropTypes.string,
    isError: PropTypes.bool,
}

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, defaultValue, isError, handleChange, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {78206258
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            defaultValue={defaultValue}
            className={
                `input-primary ${isError ? 'input-error' : ''} ` +
                className
            }
            ref={localRef}
            onChange={handleChange}
        />
    );
});
