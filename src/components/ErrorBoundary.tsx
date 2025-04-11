import React, { useEffect } from "react";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Произошла ошибка
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Попробуйте обновить страницу. Перезагрузка произойдет автоматически через несколько секунд.
                        </p>
                        {(() => {
                            useEffect(() => {
                                const timer = setTimeout(() => {
                                    window.location.reload();
                                }, 5000);
                                return () => clearTimeout(timer);
                            }, []);
                        })()}
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;