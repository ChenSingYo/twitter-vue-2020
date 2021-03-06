import moment from 'moment'
export const fromNowFilter = {
  filters: {
    fromNow (dateTime) {
      return dateTime ? moment(dateTime).locale('zh-tw').fromNow() : '-'
    }
  }
}

export const momentFilter = {
  filters: {
    date(dateTime) {
      return dateTime ? moment(dateTime).locale('zh-tw').format('ll') : '-'
    },
    time(dateTime) {
      return dateTime ? moment(dateTime).locale('zh-tw').format('LT') : '-'
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://via.placeholder.com/400x200/DFDFDF?text=No+Image'
    }
  }
}

export const countText = {
  filters: {
    countText(text) {
      if (text.length > 50) {
        text = text.substr(0, 50) + '...'
        return text
      }
      return text
    }
  }
}
