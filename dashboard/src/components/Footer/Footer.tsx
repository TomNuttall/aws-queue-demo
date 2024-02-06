import './Footer.scss'

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <p>
        {'Photo by '}
        <a href="https://unsplash.com/@nate_dumlao?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Nathan Dumlao
        </a>
        {' on '}
        <a href="https://unsplash.com/photos/ocean-wave-in-shallow-focus-lens-ciO5L8pin8A?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Unsplash
        </a>
      </p>
    </div>
  )
}

export default Footer
