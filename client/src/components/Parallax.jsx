import React from 'react'
import $ from 'jquery'
import _ from 'lodash'

export default function Parallax() {
  // ------------- VARIABLES ------------- //
  var delta
  var ticking = false
  var isFirefox = /Firefox/i.test(navigator.userAgent)
  var isIe =
    /MSIE/i.test(navigator.userAgent) ||
    /Trident.*rv\:11\./i.test(navigator.userAgent)
  var scrollSensitivitySetting = 30 //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
  var slideDurationSetting = 600 //Amount of time for which slide is "locked"
  var currentSlideNumber = 0
  var totalSlideNumber = $('.background').length

  // ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
  function parallaxScroll(evt) {
    if (isFirefox) {
      //Set delta for Chrome
      delta = evt.detail * -120
    } else if (isIe) {
      //Set delta for IE
      delta = -evt.deltaY
    } else {
      //Set delta for all other browsers
      delta = evt.wheelDelta
    }

    if (ticking != true) {
      if (delta <= -scrollSensitivitySetting) {
        //Down scroll
        ticking = true
        if (currentSlideNumber !== totalSlideNumber - 1) {
          currentSlideNumber++
          nextItem()
        }
        slideDurationTimeout(slideDurationSetting)
      }
      if (delta >= scrollSensitivitySetting) {
        //Up scroll
        ticking = true
        if (currentSlideNumber !== 0) {
          currentSlideNumber--
        }
        previousItem()
        slideDurationTimeout(slideDurationSetting)
      }
    }
  }

  // ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
  function slideDurationTimeout(slideDuration) {
    setTimeout(function() {
      ticking = false
    }, slideDuration)
  }

  // ------------- ADD EVENT LISTENER ------------- //
  var mousewheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel'
  window.addEventListener(
    mousewheelEvent,
    _.throttle(parallaxScroll, 60),
    false
  )

  // ------------- SLIDE MOTION ------------- //
  function nextItem() {
    var $previousSlide = $('.background').eq(currentSlideNumber - 1)
    $previousSlide.removeClass('up-scroll').addClass('down-scroll')
  }

  function previousItem() {
    var $currentSlide = $('.background').eq(currentSlideNumber)
    $currentSlide.removeClass('down-scroll').addClass('up-scroll')
  }
  return (
    <div className="wrapper-parallax">
      <div className="container-parallax">
        <section className="background">
          <div className="content-wrapper">
            <div className="home">
              <div className="square-hp">
                <div className="opacity-low"></div>
                <div className="bloc-hp">
                  What are you looking for?
                  <div className="buttons">
                    <a href="/forsale">
                      <button className="button-view">Buy</button>
                    </a>
                    <a href="/forrent">
                      <button className="button-view">Rent</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="background">
          <div className="content-wrapper">
            <p className="content-title">Our properties</p>
            <p className="content-subtitle">Add gmaps</p>
          </div>
        </section>
        <section className="background">
          <div className="content-wrapper">
            <p className="content-title">Our team.</p>
            <p className="content-subtitle">Aimée, Aida & Sophie-Anne</p>
          </div>
        </section>
      </div>
    </div>
  )
}
