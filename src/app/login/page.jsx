import Login from '@/components/LogInFrom';
import React, { Suspense } from 'react';

const LogInPage = () => {
    return (
        <div>
            <Suspense fallback="Loading...">
                <Login />
            </Suspense>
        </div>
    );
};

export default LogInPage;