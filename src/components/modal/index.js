import { h, Component } from "preact";

function formatError(error) {
  return (
    (error.json && error.json.error_description) ||
    error.message ||
    error.toString()
  );
}

export default class Modal extends Component {
  handleClose = (e) => {
    e.preventDefault();
    this.props.onClose();
  };

  blockEvent = (e) => {
    e.stopPropagation();
  };

  linkHandler = (page) => (e) => {
    e.preventDefault();
    this.props.onPage(page);
  };

  render() {
    const {
      page,
      error,
      loading,
      showHeader,
      showSignup,
      devSettings,
      isOpen,
      children,
      logo,
      t,
      isLocal,
      clearSiteURL,
      clearStoreError
    } = this.props;
    const hidden = loading || !isOpen;
    const formattedError = error ? formatError(error) : null;
    return (
      <div
        className="modalContainer"
        role="dialog"
        aria-hidden={`${hidden}`}
        onClick={this.handleClose}
      >
        <div
          className={`modalDialog${loading ? " visuallyHidden" : ""}`}
          onClick={this.blockEvent}
        >
          <div className="modalContent">
            <button onclick={this.handleClose} className="btn btnClose">
              <span className="visuallyHidden">Close</span>
            </button>
            {page.title ? (
              <div className="header">
                  {t(page.title)}
              </div>
            ) : (
              <div className="header">
                Enter the Salon
              </div>
            )}
            {devSettings && (
              <div className="header">
                <button className="btn btnHeader active">
                  {t("site_url_title")}
                </button>
              </div>
            )}
            {formattedError && (
              <div className="flashMessage error">
                <span>{t(formattedError)}</span>
              </div>
            )}
            {isLocal &&
              formattedError &&
              formattedError.includes("Failed to load settings from") && (
                <div>
                  <button
                    onclick={(e) => {
                      clearSiteURL(e);
                      clearStoreError();
                    }}
                    className="btnLink forgotPasswordLink"
                  >
                    {t("site_url_link_text")}
                  </button>
                </div>
              )}
            {children}
          </div>
        </div>
      </div>
    );
  }
}
