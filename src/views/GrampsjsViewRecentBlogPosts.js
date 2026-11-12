import {html, css} from 'lit'

import {GrampsjsConnectedComponent} from '../components/GrampsjsConnectedComponent.js'
import '../components/GrampsjsSearchResultList.js'
import {fireEvent} from '../util.js'

export class GrampsjsViewRecentBlogPosts extends GrampsjsConnectedComponent {
  static get styles() {
    return [
      super.styles,
      css`
        .change {
          font-size: 0.8em;
          color: var(--grampsjs-body-font-color-50);
          margin-top: 0.3em;
        }

        h3 {
          margin-bottom: 15px;
        }
      `,
    ]
  }

  renderContent() {
    if (!this._data?.data?.length) {
      return html`
        <h3>${this._('Latest Blog Posts')}</h3>
        <p>${this._('None')}.</p>
      `
    }
    return html`
      <h3>${this._('Latest Blog Posts')}</h3>
      <grampsjs-search-result-list
        large
        selectable
        @search-result:clicked="${this._handleClick}"
        .data="${this._data.data.slice(0, 5).map(obj => ({
          object: obj,
          object_type: 'source',
        }))}"
        .appState="${this.appState}"
        date
        noSep
      >
      </grampsjs-search-result-list>
      <small><a href="/blog">${this._('More on the blog')}</a></small>
    `
  }

  renderLoading() {
    return html`
      <h3>${this._('Latest Blog Posts')}</h3>
      <grampsjs-search-result-list
        .data="${this._data.data}"
        .appState="${this.appState}"
        loading
        numberLoading="5"
        noSep
      ></grampsjs-search-result-list>
      <small><a href="/blog">${this._('More on the blog')}</a></small>
    `
  }

  _handleClick(event) {
    const grampsId = event?.detail?.object?.gramps_id
    if (grampsId) {
      fireEvent(this, 'nav', {path: `blog/${grampsId}`})
    }
  }

  getUrl() {
    const rules = {
      rules: [
        {
          name: 'HasTag',
          values: ['Blog'],
        },
      ],
    }
    return `/api/sources/?rules=${encodeURIComponent(
      JSON.stringify(rules)
    )}&pagesize=5&sort=-change&locale=${
      this.appState.i18n.lang || 'en'
    }&profile=all&extend=all`
  }
}

window.customElements.define(
  'grampsjs-view-recent-blog-posts',
  GrampsjsViewRecentBlogPosts
)
