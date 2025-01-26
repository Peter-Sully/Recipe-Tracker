import React from 'react'

const Article = ({artNum, artTitle, artDate, artImg, artCaption, artDesc}) => {
  return (
    <div className="article">
        <div className="art-header">
            <h4>{artNum}) {artTitle}</h4>
            <p>{artDate}</p>
        </div>
        <div className="art-content">
            <img src ={artImg} alt = {artCaption}/>
            <p>{artDesc}</p>
        </div>
    </div>
  )
}

export default Article