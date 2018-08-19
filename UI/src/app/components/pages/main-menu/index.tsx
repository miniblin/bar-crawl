import * as React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.css'

interface IProps {
  className?: string
}

export default function MainMenu (props: IProps) {
  const { className } = props

  return (
        <section className={'main-menu'}>
            <NavLink to={'/bar-crawl-map'}>
                <button className={'main-menu__create'}>
                    Create a Crawl
                </button>
            </NavLink>
            <div className={'main-menu__join'}>
                <input placeholder='crawl Code' className={'main-menu__join-input'} />
                <NavLink to={'/bar-crawl-map'}>
                    <button className={'main-menu__join-button'}>
                        Join A crawl
                    </button>
                </NavLink>
            </div>
        </section>

  )
}
