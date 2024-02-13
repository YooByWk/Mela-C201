import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { musicSearch } from "../../API/PortfolioAPI"
import DefaultPortfolioShape from "./DefaultPortfolioShape"
import styled from "styled-components"

function SearchPortfolio(props) {
    const { word } = useParams()
    const [values, setValues] = useState([])

    useEffect(() => {
        const info = async() => {
            try {
                const searchInfo = await musicSearch(word)
                setValues(searchInfo)

            } catch (err) {
                console.log(err)
            }
        }
        info()
        
    },[word])

    // console.log(values)
    return(
        <SearchContainer>
          {values.length === 0 ? (
            <>
            <H1>일치하는 검색 결과가 없습니다.</H1>
          </>
          ) : (
          <>
            {Object.entries(values).map(([key, value]) => (
              <DefaultPortfolioShape 
                  key={value[0].portfolioMusicIdx}
                  albumImage={value[0].albumArtFileIdx}
                  nickname={value[0].userIdx.nickname}
                  profileImage={value[1].portfolio_picture_file_idx}
                //   onClick={(event) => Navi(`/teamspace/${value.teamspaceIdx}`)}
              />
            ))}
          </>
          )}
      </SearchContainer>
    )
}

export default SearchPortfolio

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 3% 5%;
  gap: 4%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

const H1 = styled.p`
  color: white;
`