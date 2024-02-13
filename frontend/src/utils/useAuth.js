import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded = jwtDecode(token)
        const { username, userId } = decoded.UserInfo // add roles later

        return { username, userId } 
    }

    return { username: '', status, userId }
}
export default useAuth