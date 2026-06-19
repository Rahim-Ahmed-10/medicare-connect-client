import Register from '@/components/RegisterFrom';
import React, { Suspense } from 'react';

const RegisterPage = () => {
    return (
        <div>
            <Suspense fallback="Loading...">
                <Register />
            </Suspense>
        </div>
    );
};

export default RegisterPage;