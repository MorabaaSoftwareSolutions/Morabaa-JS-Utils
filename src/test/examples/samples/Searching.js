import React from 'react'

const Searching = ({ service }) => {
  return (
    <div
      style={{
        zIndex: 3000,
        right: '50vw',
        marginRight: -50,
        top: '50vh',
        marginTop: -50
      }}
      className='fixed'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='-50 -50 500 500'
        style={{ width: 100, height: 100 }}
      >
        <path
          fill='none'
          stroke='#DA3746'
          strokeWidth='46'
          className='squiggle'
          d='M111.6,344.3h217.2c33.8-2.5,61.2-29.9,61.2-63.7V88.8c0-33.9-27.5-61.4-61.4-61.4H87.3c-33.8,0-61.1,27.4-61.1,61.1l0.6,238.7c0.1,34.6,28.3,62.5,63.1,62.5h67.8'
        />
        <path
          fill='none'
          stroke='#DA374655'
          strokeWidth='47'
          className='squiggle-2'
          d='M111.6,344.3h217.2c33.8-2.5,61.2-29.9,61.2-63.7V88.8c0-33.9-27.5-61.4-61.4-61.4H87.3c-33.8,0-61.1,27.4-61.1,61.1l0.6,238.7c0.1,34.6,28.3,62.5,63.1,62.5h67.8'
        />
      </svg>
    </div>
  )
  // return (
  //     <div className="searching-icon-container">
  //         <SearchingIcon />
  //     </div>
  // );
}

export default Searching
