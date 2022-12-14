import React from "react";
import Image from "next/image";
import Styled from "styled-components";
import { istatic } from "services";
import { Frame_u8Props } from "types/components";


const ViewPort = Styled.section`
	position: relative;
	width: 100%
`

const FadeOut = Styled.div`
  position: absolute;
  background-color: #000;
  opacity: 0;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: 400ms;

  :hover {
  	opacity: 50%;
  }
`

const Img = Styled.img`
	width: 100%;
	margin: 5px 0;
`


const Frame_u8:React.FC<Frame_u8Props> = ({ src, onSelect }) => {

	return (
		<ViewPort onClick={e => {if (onSelect) onSelect(src)}}>
			<FadeOut/>
			<Img src={src.urls.regular} alt={src.alt_description}/>
		</ViewPort>
	);
}

export default Frame_u8;
