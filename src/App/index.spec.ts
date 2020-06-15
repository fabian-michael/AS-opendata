import App from './index.svelte'
import { render } from '@testing-library/svelte'

describe('App', () => {
    it('should render the app', () => {
        const { container, getAllByText } = render(App)
        expect(container).toMatchSnapshot()
    })
})
