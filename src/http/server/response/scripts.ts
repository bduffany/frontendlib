export const CLEAR_BODY_SCRIPT = '<script>document.body.innerHTML=""</script>';

export function redirectScript(location: string) {
  return `<script>window.location.href="${location}"</script>`;
}
