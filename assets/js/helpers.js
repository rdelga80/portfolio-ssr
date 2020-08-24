import { split } from 'lodash'

export const formatTags = (tags) => {
  return split(tags, ',') || []
}
