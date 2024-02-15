import * as React from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { styled, css } from '@mui/system'
import { Modal as BaseModal } from '@mui/base/Modal'
import { ScheduleDelete } from '../../API/ScheduleAPI'
import moment from 'moment'
import { FaTrashAlt } from "react-icons/fa"
import ScheduleEditModal from './ScheduleEdit'


function ScheduleAllModal({ className, fontSize, padding, teamspaceId, dates, onRefresh }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const ScheduleDeleteHandler = async (scheduleId) => {
        try {
            await ScheduleDelete({ teamspaceId, scheduleId })
            onRefresh()
        } catch (err) {
        }
    }

    const handleScheduleEdit = () => {
        // 여기서는 예시로 일정 목록을 새로고침합니다.
        onRefresh();
    };

    return (
        <>
        <TriggerButton type="button" onClick={handleOpen} className={className} fontSize={fontSize} padding={padding}>
            더보기
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
                    모든 일정
                </h2>
                <ul>
                    { dates && dates.length > 0 ? (
                        dates.map((schedule) => {
                            return (
                                <div id="modal-description" className="modal-description" key={schedule.scheduleIdx}>
                                    <li>
                                        {moment(schedule.startTime).format('MM/DD HH:mm')} - {moment(schedule.endTime).format('MM/DD HH:mm')}
                                        <div className="content">
                                            <p>{schedule.content} ({schedule.place})</p>
                                            <div className='btn-group'>
                                                <div className='edit'>
                                                    <ScheduleEditModal
                                                        teamspaceId={teamspaceId}
                                                        scheduleId={schedule.scheduleIdx}
                                                        initialData={schedule}
                                                        onScheduleEdit={handleScheduleEdit}
                                                    />
                                                </div>
                                                <div className='delete'>
                                                    <FaTrashAlt 
                                                        onClick={() => ScheduleDeleteHandler(schedule.scheduleIdx)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <hr />
                                </div>
                            )
                        }) )
                        : (
                            <p>일정이 없습니다.</p>
                        )}
                </ul>

            </ModalContent>
        </Modal>
        </>
    )
}

export default ScheduleAllModal


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
  
    & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        margin-bottom: 4px;
    }

    & .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    & .btn-group {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }

    & .edit {
        margin-right: 20px;
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