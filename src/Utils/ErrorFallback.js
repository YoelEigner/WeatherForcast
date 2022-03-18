import React from 'react'
import { Toast } from 'react-bootstrap'

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <Toast style={{ marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'pink' }}>
            <Toast.Body>{error.message}</Toast.Body>
        </Toast>
    )
}
