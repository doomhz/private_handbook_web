import React from 'react'
import {Link} from 'react-router'
import appStoreBadge from '../../public/imgs/common/app_store_badge_small.png'

const APPSTORE_URL='https://itunes.apple.com/us/app/private-handbook/id1163154893'

export default class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <h1>Private Handbook</h1>
        <p>
          Private Handbook is a set of productivity tools that helps managing your time better.
          Here you have all the necessary ingredients that you need on a daily bases in one single app.
          We like to think about PH as an electronic agenda that keeps you organised and guides your through life or, simply, your life coach.
        </p>
        <p><b>Features:</b></p>
        <ul>
          <li>
            <b>Todo List</b> - an Eisenhower Matrix based Todo List to keep you focused on the important things.
          </li>
          <li>
            <b>Journal (coming soon)</b> - helps you to keep track of your daily life and analyse your thoughts.
          </li>
          <li>
            <b>Goals (coming soon)</b> - keep track of your long term life goals.
          </li>
          <li>
            <b>Bucket List (coming soon)</b> - list crazy stuff in here and start doing it now!
          </li>
          <li>
            <b>Library (coming soon)</b> - weekly articles on lifestyle and self discovery.
          </li>
        </ul>
        <p>Manage yourself better with Private Handbook!</p>
        <a href={APPSTORE_URL} title="Get Private Handbook on your iPhone">
          <img src={appStoreBadge} alt="Get Private Handbook on your iPhone" />
        </a>
        <p>...or <Link to="/todos">use it in the browser</Link>.</p>
      </div>
    )
  }
}
