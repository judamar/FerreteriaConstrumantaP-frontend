import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function show_alert(msg, ico, focus) {
  onFocus(focus)
  const MySwal = withReactContent(Swal)
  MySwal.fire({
    title: msg,
    icon: ico
  })
}

function onFocus(focus) {
  if(focus !== ''){
    document.getElementById(focus).focus()
  }
}