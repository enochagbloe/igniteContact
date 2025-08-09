const ROUTES = {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    ASK_QUESTION: '/ask-question',
    PRAYERS: '/prayers',
    SUBMIT_PRAYER: '/prayers/submit',
    PRAYER: (id: string) => `/prayers/${id}`,
    PROFILE: (id: string) => `/profile/${id}`,
    TAG: (id: string) => `/tags/${id}`,
    QUESTION: (id: string) => `/questions/${id}`,
}
export default ROUTES;