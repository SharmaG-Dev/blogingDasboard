import { useState, useRef, useEffect, cloneElement } from 'react'
import PropTypes from 'prop-types'

const Dropdown = ({
  button,
  menu,
  direction = 'down',
  className = '',
  menuClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const directionClasses = {
    down: 'top-full left-0 mt-1',
    up: 'bottom-full left-0 mb-1',
    left: 'right-full top-0 mr-1',
    right: 'left-full top-0 ml-1'
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {cloneElement(button, {
        onClick: toggleMenu,
        'data-state': isOpen ? 'open' : 'closed'
      })}

      {isOpen && (
        <div
          className={`absolute ${directionClasses[direction]} ${menuClassName}`}
          role="menu"
        >
          {cloneElement(menu, {
            'data-state': isOpen ? 'open' : 'closed'
          })}
        </div>
      )}
    </div>
  )
}

Dropdown.propTypes = {
  button: PropTypes.element.isRequired,
  menu: PropTypes.element.isRequired,
  direction: PropTypes.oneOf(['down', 'up', 'left', 'right']),
  className: PropTypes.string,
  menuClassName: PropTypes.string
}

Dropdown.defaultProps = {
  direction: 'down',
  className: '',
  menuClassName: ''
}

export default Dropdown