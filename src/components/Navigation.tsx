import React, { ReactElement } from 'react'
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css"

// Eigene Styling füe Horizontale Hauptmenu
const styleLink = ({ isActive }:any) => isActive
  ? {
    color: '#fff',
    background: '#7600dc',
    fontSize: '20px',
    paddingTop: '10%',
    paddingRight: 15,
  }
  : { 
    color: '#545e6f', 
    background: '#f0f0f0',
    fontSize: '20px',
    paddingRight: 15 
}

interface Props {
  children: ReactElement
}

/**
 * Standard Navigation / Layout Funktion
 */
export default function Navigation(props: Props) {
  return (
    <>
      <nav className={css.container} role="navigation">
        <NavLink style={styleLink} to="/fe">
          FEWwertpapieren
        </NavLink>
        <NavLink style={styleLink} to="/stocks">
          Aktien
        </NavLink>
        <NavLink style={styleLink} to="/portfolio">
          Portfolio
        </NavLink>
        <NavLink style={styleLink} to="/be">
          Wertpapieren BE
        </NavLink>
      </nav>
      <div className="container">{props.children}</div>
    </>
  )
}
