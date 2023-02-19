import { JsonExample } from './examples'
import StoryModle from './StoryModle'

const { Template, story } = StoryModle(JsonExample)
export default story
export const Sample = Template.bind({})
