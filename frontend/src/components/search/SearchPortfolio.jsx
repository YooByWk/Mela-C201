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
        
    },[])

    return(
        <SearchContainer>
        {Object.entries(values).map(([key, value]) => (
          <DefaultPortfolioShape 
              key={value.portfolioMusicIdx}
              albumImage={value.albumArtFileIdx.fileIdx}
              content={value.userIdx.nickname}
              profileImage={value.teamspacePictureFileIdx}
            //   onClick={(event) => Navi(`/teamspace/${value.teamspaceIdx}`)}
          />
        ))}
      </SearchContainer>
    )
}

export default SearchPortfolio

const SearchContainer = styled.div`
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