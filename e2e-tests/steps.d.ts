/// <reference types='codeceptjs' />


declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, login: any }
  interface Methods extends Playwright, REST, JSONResponse {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
