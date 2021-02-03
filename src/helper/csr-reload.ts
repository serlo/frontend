import Router from 'next/router'

export const csrReload = () => void Router.replace(Router.asPath.split('#')[0])
