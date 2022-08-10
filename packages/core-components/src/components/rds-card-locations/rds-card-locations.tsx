import { Component, h, Prop } from '@stencil/core';

/**
 * @slot title - Use this slot to add a title to the card.
 * @slot location-info - Use this slot to add a tooltip with locations info to the card.
 * @slot locations - Use this slot to add the number of locations to the card.
 * @slot locations-label -  Use this slot to add a label underneath the locations number.
 * @slot recommendations - Use this slot to add the number of recommendations to the card.
 * @slot recommendations-info -Use this slot to add a tooltip with recommendations info to the card.
 * @slot recommendations-label - Use this slot to add a label underneath the recommendations number.
 * @slot description - Use this slot to add a description to the bottom of the card.
 */
@Component({
  tag: 'rds-card-locations',
  styleUrl: 'rds-card-locations.scss',
  shadow: true,
})
export class RdsCardLocations {
  /**
   * @deprecated
   * When enabled, this will show the first number box for showing Location Count.
   */
  @Prop({ reflect: true }) showLocations: boolean = false;

  /**
   * @deprecated
   * When error is true the card will display a message with a slot for action.
   */
  @Prop({ reflect: true }) error?: boolean = false;

  /**
   * @deprecated
   * When error is true the card will display a message with a slot for action.
   */
  @Prop({ reflect: true }) loading?: boolean = false;

  renderErrorMsg() {
    return (
      <rds-card-body>
        <div class="text">
          <slot name="title"></slot>
        </div>
        <div class="error-outer">
          <rds-text weight="bold">Something went wrong.</rds-text>
          <rds-text>Check your connection and try reloading.</rds-text>
          <slot name="error-action"></slot>
        </div>
      </rds-card-body>
    );
  }

  renderLoading() {
    return <rds-skeleton height="200px" variant="rect" />;
  }

  renderCardBody() {
    return (
      <rds-card-container>
        <rds-card-body padded={false}>
          <div class="text">
            <slot name="title"></slot>
          </div>
          <div class="wrapper">
            {this.showLocations ? (
              <div class="locations">
                <div class="location-number">
                  <div class="more-info">
                    <slot name="location-info"></slot>
                  </div>
                  <slot name="locations"></slot>
                </div>
                <slot name="locations-label"></slot>
              </div>
            ) : null}
            <div class="recommendations">
              <div class="recommendations-number">
                <div class="more-info">
                  <slot name="recommendations-info"></slot>
                </div>
                <slot name="recommendations"></slot>
              </div>
              <slot name="recommendations-label"></slot>
            </div>
          </div>
        </rds-card-body>
        <rds-divider spacing="none"></rds-divider>
        <rds-card-footer>
          <slot name="description"></slot>
        </rds-card-footer>
      </rds-card-container>
    );
  }

  renderComp() {
    if (this.error) {
      return this.renderErrorMsg();
    } else if (this.loading) {
      return this.renderLoading();
    } else {
      return this.renderCardBody();
    }
  }

  render() {
    return this.renderComp();
  }
}
