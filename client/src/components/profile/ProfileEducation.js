import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, from, to, description }
}) => (
  <div>
    <h3 className='text-dark'>{school}</h3>
    <p>
      <strong>When: </strong>
      <Moment format='MM/DD/YYYY'>{from}</Moment> -{' '}
      {!to ? ' Now' : <Moment format='MM/DD/YYYY'>{to}</Moment>}
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field Of Study: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong> {!description ? 'None' : { description }}
    </p>
  </div>
)

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired
}

export default ProfileEducation
