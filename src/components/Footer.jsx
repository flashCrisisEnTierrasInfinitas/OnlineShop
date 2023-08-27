import { CFooter,CLink} from '@coreui/react'

export default function Footer() {
    return (
        <div className="conter-footer">
            <CFooter>
                <div>
                    <CLink href="https://coreui.io">CoreUI</CLink>
                    <span>&copy; 2023 creativeLabs.</span>
                </div>
                <div>
                    <span>Powered by</span>
                    <CLink href="https://coreui.io">CoreUI</CLink>
                </div>
            </CFooter>
        </div>
    )
}