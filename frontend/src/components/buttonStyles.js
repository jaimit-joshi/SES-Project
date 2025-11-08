import styled from "styled-components"
import { Button } from "@mui/material"

export const RedButton = styled(Button)`
  && {
    background-color: #f44336;
    color: white;
    margin-left: 4px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-transform: none;
    box-shadow: 0 2px 5px rgba(244, 67, 54, 0.2);
    &:hover {
      background-color: #d32f2f;
      box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
      transform: translateY(-1px);
    }
    @media (max-width: 428px) {
      padding: 6px 12px;
      font-size: 0.8125rem;
      margin-left: 2px;
      border-radius: 6px;
    }
  }
`

export const BlackButton = styled(Button)`
  && {
    background-color: #212121;
    color: white;
    margin-left: 0;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 0 8px 8px 0;
    transition: all 0.3s ease;
    text-transform: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    &:hover {
      background-color: #000000;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      transform: translateY(-1px);
    }
    @media (max-width: 428px) {
      padding: 6px 12px;
      font-size: 0.8125rem;
      border-radius: 0 6px 6px 0;
    }
  }
`

export const DarkRedButton = styled(Button)`
  && {
    background-color: #7f0000;
    color: white;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-transform: none;
    box-shadow: 0 2px 5px rgba(127, 0, 0, 0.2);
    &:hover {
      background-color: #b71c1c;
      box-shadow: 0 4px 8px rgba(127, 0, 0, 0.3);
      transform: translateY(-1px);
    }
    @media (max-width: 428px) {
      padding: 6px 12px;
      font-size: 0.8125rem;
      border-radius: 6px;
    }
  }
`

// Update the BlueButton style
export const BlueButton = styled(Button)`
  && {
    background-color: #1976d2;
    color: #fff;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-transform: none;
    box-shadow: 0 2px 5px rgba(25, 118, 210, 0.2);
    font-size: 14px;
    min-width: 80px;
    &:hover {
      background-color: #0d47a1;
      box-shadow: 0 4px 8px rgba(25, 118, 210, 0.3);
      transform: translateY(-1px);
    }
    @media (max-width: 428px) {
      padding: 6px 12px;
      font-size: 0.8125rem;
      min-width: 60px;
      border-radius: 6px;
    }
  }
`

export const PurpleButton = styled(Button)`
  && {
    background-color: #4a148c;
    color: #fff;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-transform: none;
    box-shadow: 0 2px 5px rgba(74, 20, 140, 0.2);
    font-size: 14px;
    min-width: 80px;
    &:hover {
      background-color: #6a1b9a;
      box-shadow: 0 4px 8px rgba(74, 20, 140, 0.3);
      transform: translateY(-1px);
    }
    @media (max-width: 428px) {
      padding: 6px 12px;
      font-size: 0.8125rem;
      min-width: 60px;
      border-radius: 6px;
    }
  }
`

export const LightPurpleButton = styled(Button)`
  && {
    background-color: #7f56da;
    color: #fff;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-transform: none;
    box-shadow: 0 2px 5px rgba(127, 86, 218, 0.2);
    &:hover {
      background-color: #6a3dc8;
      box-shadow: 0 4px 8px rgba(127, 86, 218, 0.3);
      transform: translateY(-1px);
    }
    @media (max-width: 428px) {
      padding: 6px 12px;
      font-size: 0.8125rem;
      border-radius: 6px;
    }
  }
`

// Update the GreenButton style
export const GreenButton = styled(Button)`
  && {
    background-color: #2e7d32;
    color: #fff;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-transform: none;
    box-shadow: 0 2px 5px rgba(46, 125, 50, 0.2);
    font-size: 14px;
    min-width: 80px;
    &:hover {
      background-color: #1b5e20;
      box-shadow: 0 4px 8px rgba(46, 125, 50, 0.3);
      transform: translateY(-1px);
    }
    @media (max-width: 428px) {
      padding: 6px 12px;
      font-size: 0.8125rem;
      min-width: 60px;
      border-radius: 6px;
    }
  }
`

export const BrownButton = styled(Button)`
  && {
    background-color: #4e342e;
    color: white;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-transform: none;
    box-shadow: 0 2px 5px rgba(78, 52, 46, 0.2);
    &:hover {
      background-color: #3e2723;
      box-shadow: 0 4px 8px rgba(78, 52, 46, 0.3);
      transform: translateY(-1px);
    }
    @media (max-width: 428px) {
      padding: 6px 12px;
      font-size: 0.8125rem;
      border-radius: 6px;
    }
  }
`

export const IndigoButton = styled(Button)`
  && {
    background-color: #303f9f;
    color: white;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-transform: none;
    box-shadow: 0 2px 5px rgba(48, 63, 159, 0.2);
    &:hover {
      background-color: #1a237e;
      box-shadow: 0 4px 8px rgba(48, 63, 159, 0.3);
      transform: translateY(-1px);
    }
    @media (max-width: 428px) {
      padding: 6px 12px;
      font-size: 0.8125rem;
      border-radius: 6px;
    }
  }
`
