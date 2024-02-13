import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultButton from "../components/DefaultButton";
import PortfolioAdd from "../components/PortfolioAdd";
import { TiPin } from "react-icons/ti";
import { RiHeadphoneFill } from "react-icons/ri";
import { othersInfo } from "../API/UserAPI";
import { useParams } from "react-router-dom";
import DefaultPortfolio from "../components/DefaultPortfolio";

const Hedaer = styled.div`
    display: flex;
    justify-content: center;
    color: white;

    .btn-wrapper {
        margin-left: 1rem;
    }
`

const PinList = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    color: white;

    .title {
        display: flex;
    }
`

const AllList = styled.div`
    display: flex;
    padding: 20px;
    color: white;

    .title {
        display: flex;
    }
`

function PortfolioAll() {
    const emailIdInfo = useParams()
    const [userValues, setUserValues] = useState({})
    const [musicValues, setMusicValues] = useState([])
    // console.log(emailIdInfo.emailId)

    useEffect(() => {
        // console.log(emailIdInfo)
        const getInfo = async() => {
            try{
                const response = await othersInfo(emailIdInfo.emailId)
                // console.log(response[2])
                setUserValues(response[0])
                setMusicValues(response[2])
            } catch (err){
                console.log(emailIdInfo.emailId)
                console.log(err)
            }
            }
        
        getInfo()
    
    },[])

    // console.log(values)
    // console.log(typeof(values))
    return (
        <>
            <Hedaer>
                <h1>{userValues.nickname} 님의 Portfolio</h1>
                <div className="btn-wrapper">
                    <PortfolioAdd />
                </div>
            </Hedaer>
            
            {/* <PinList>
                <div className="title">
                    <TiPin />
                    <h3>Pin</h3>
                </div>
                <DefaultButton 
                    text={'Edit'}
                    backgroundcolor={'#6C7383'}
                    fontcolor={'white'}
                    width={'100px'}
                />
            </PinList>
            <hr /> */}
            <AllList>
                <div className="title">
                    <RiHeadphoneFill />
                    <h3>All</h3>
                    <Container>
                        {Object.entries(musicValues).map(([key, value]) => (
                        <DefaultPortfolio
                            key={value.portfolioMusicIdx}
                            albumImage={value.albumArtFileIdx}
                            content={value.lyricFileIdx}
                            //   onClick={(event) => Navi(`/teamspace/${value.teamspaceIdx}`)}
                        />
                        ))}
                </Container>
                </div>
            </AllList>
        </>
    )
}

export default PortfolioAll

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-top: 3%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

const Img = styled.img`
    width: 30px;
    height: 20px;
`