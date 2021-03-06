import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({
  experience: { company, title, location, current, from, to, description }
}) => (
  <div>
    <h3 className='text-dark'>{company}</h3>
    <p>
      <strong>When: </strong>
      <Moment format='MM/DD/YYYY'>{from}</Moment> -{' '}
      {!to ? ' Now' : <Moment format='MM/DD/YYYY'>{to}</Moment>}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Location: </strong> {location}
    </p>
    <p>
      <strong>Description: </strong> {!description ? 'None' : { description }}
    </p>
  </div>
)

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
}

export default ProfileExperience
