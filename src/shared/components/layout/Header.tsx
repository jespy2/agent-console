export const Header = () => {
  return (
    <header className='app-header'>
      <div className='app-header_left'>
        <span className='app-title'>Agent Console</span>
      </div>

      <div className='app-header_right'>
        <span className='user-pill' aria-label='Current user'>
          Agent · Mock
        </span>
      </div>
    </header>
  )
}