import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { styled, css } from '@mui/system'
import { Modal as BaseModal } from '@mui/base/Modal'
import { ScheduleUpdate } from '../../API/ScheduleAPI'
import moment from 'moment'


function ScheduleEditModal({
    className, fontSize, padding,
    teamspaceId, scheduleId, initialData, onScheduleEdit }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [values, setValues] = React.useState({
      content: '',
      place: '',
      sDate: '',
      sTime: '',
      eDate: '',
      eTime: '',
    });

    React.useEffect(() => {
      if (initialData) {
        setValues({
          content: initialData.content,
          place: initialData.place,
          sDate: moment(initialData.startTime).format('YYYY-MM-DD'),
          sTime: moment(initialData.startTime).format('HH:mm'),
          eDate: moment(initialData.endTime).format('YYYY-MM-DD'),
          eTime: moment(initialData.endTime).format('HH:mm'),
        })

      }
    }, [initialData])

    const handleChange = async (e) => {
        const { id, value } = e.target
        setValues({
          ...values,
          [id] : value
        })
    }

    const formatDateTime = (date, time) => {
        const info = time ? `${time}:00` : '00:00:00'
        // console.log(`${info}`)
        return `${date} ${info}`
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const startDateTime = formatDateTime(values.sDate, values.sTime)
        const endDateTime = formatDateTime(values.eDate, values.eTime)

        if (new Date(endDateTime) < new Date(startDateTime)) {
            alert('종료일은 시작일보다 빠를 수 없습니다.')
            return
        }

        try {
            const data = {
                content: values.content,
                place: values.place,
                startTime: startDateTime,
                endTime: endDateTime
            }
    
            await ScheduleUpdate(teamspaceId, scheduleId, data)
            onScheduleEdit()
            handleClose()

        } catch(err) {
            // console.log(err)
        }
    }


    return (
        <>
        <TriggerButton type="button" onClick={handleOpen} className={className} fontSize={fontSize} padding={padding}>
            수정
        </TriggerButton>
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
        >
            <ModalContent sx={{ width: 400 }}>
                <h2 id="modal-title" className="modal-title">
                    일정 수정
                </h2>
                <form onSubmit={handleSubmit}> 
                <div id="modal-description" className="modal-description">
                    <div className='inputWrapper'>
                        <label className='label'>내용</label>
                        <input type='text' className='input' placeholder='일정 내용을 입력해주세요' id='content' value={values.content} onChange={handleChange} />
                    </div>
                    <div className='inputWrapper'>
                        <label className='label'>장소</label>
                        <input type='text' className='input' id='place' value={values.place} onChange={handleChange} />
                    </div>
                    <div className='inputWrapper'>
                        <label className='label'>시작일</label>
                        <input type='date' className='input' id='sDate' value={values.sDate} onChange={handleChange} />
                        <input type='time' className='input' id='sTime' value={values.sTime} onChange={handleChange} />
                    </div>                            
                    <div className='inputWrapper'>
                        <label className='label'>종료일</label>
                        <input type='date' className='input' id='eDate' value={values.eDate} onChange={handleChange} />
                        <input type='time' className='input' id='eTime' value={values.eTime} onChange={handleChange} />
                    </div>
                    <button type='submit' className='button'>
                        Save
                    </button>
                </div>
                </form>
            </ModalContent>
        </Modal>
        </>
    )
}

export default ScheduleEditModal


const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
      <div
        className={clsx({ 'base-Backdrop-open': open }, className)}
        ref={ref}
        {...other}
      />
    )
})
  
Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
}
  
const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`
  
const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
`
  
const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      border-radius: 8px;
      padding: 4rem;
      color: white;
      background: linear-gradient(180deg, #0C0A15 0%, #171930 100%);
  
    & .modal-title {
        text-align: center;
        line-height: 1.5rem;
        margin-bottom: 2rem;
        text-decoration: underline;
        text-decoration-color: #254EF8;
    }
  
    & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        margin-bottom: 4px;
    }
  
    & .find-password {
        margin: 0;
        font-weight: 200;
        margin-bottom: 4px;
        color: gray;
    }
  
    & .button {
        background-color: #254EF8;
        border: none;
        border-radius: 5px;
        color: white;
        width: 100%;
        height: 2.5rem;
        font-size: medium;
        margin-top: 10px;
    }
  
    & .input {
        background-color: #151c2c;
        border: none;
        height: 2.5rem;
        color: white;
        flex-grow: 1;
    }
  
    & .label {
        color: #254EF8;
        font-weight: bold;
        padding: 10px;
    }
  
    & .inputWrapper {
        background-color: #151c2c;
        margin-bottom: 1rem;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`,
)
  
const dynamicStyle = ({ fontSize = '0.875rem', padding = '8px 16px' }) => css`
    font-size: ${fontSize};
    padding: ${padding};
`

const TriggerButton = styled('button')(
    // ({ theme, fontSize, padding }) => css`
    `${dynamicStyle}
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: ${props => props.fontSize ||'0.875rem'};
      padding: ${props => props.padding || '8px 16px'};
      line-height: 1.5;
      border-radius: 28px;
      transition: all 150ms ease;
      cursor: pointer;
      background: #10141d;
      border: 4px solid #254EF8;
      color: white;
      // 버튼을 올렸을 때 색상
      &:hover {
        background:linear-gradient(90deg, #254EF8,#3960fc, #873FFA,#a977fa);
        border:4px solid #254EF8;
      }
  
      // 버튼을 누를 때 색상
      &:active {
        background:linear-gradient(90deg, #254EF8, #873FFA);
        border:4px solid #10141d;
      }
    `,
)