import React, { useState, useEffect } from 'react'
import { retrieveReport } from '../features/userApis'
import { useParams } from 'react-router-dom'
import { Col, Card, CardTitle, CardBody, Table } from 'reactstrap'
import ReactApexChart from "react-apexcharts"
import Loader from './loader/Loader'
import Calendar from 'react-calendar'

const AgentReport = () => {
  const param = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [userReport, setUserReport] = useState()
  const [calenderToggle,setCalenderToggle] = useState(false)
  const [date,setDate] = useState([])
  const [payload,setPayload] = useState({
    name : param.name,
  })

  const [usergraph, setUserGraph] = useState({
    series: [Number(userReport?.counts?.good), Number(userReport?.counts?.average), Number(userReport?.counts?.bad)],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                return Number(userReport?.counts?.total)
              }
            }
          }
        }
      },
      labels: ['Good', 'Average', 'Bad'],
    },
  })

  const [totalRatings, setTotalRatings] = useState({
    series: [Number(userReport?.ev?.length), Number(userReport?.esc?.length)],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                return Number(userReport?.ev?.length + userReport?.esc?.length)
              }
            }
          }
        }
      },
      labels: ['Evaluation', 'Escalation'],
    },
  })

  const getReport = async () => {
    const { data } = await retrieveReport(payload)
    setUserReport(data)
  }

  useEffect(() => {
    if (userReport?.counts) {
      setUserGraph((pre) => ({
        ...pre,
        series: [
          Number(userReport?.counts?.good),
          Number(userReport?.counts?.average),
          Number(userReport?.counts?.bad)
        ],
        options: {
          ...pre,
          plotOptions: {
            radialBar: {
              dataLabels: {
                ...pre,
                total: {
                  ...pre,
                  formatter: function (w) {
                    return Number(userReport?.counts?.total)
                  }
                }
              }
            }
          }
        },
      }));
      setTotalRatings((pre) => ({
        ...pre,
        series: [
          Number(userReport?.ev?.length),
          Number(userReport?.esc?.length)
        ],
        options: {
          ...pre,
          plotOptions: {
            radialBar: {
              dataLabels: {
                ...pre,
                total: {
                  ...pre,
                  formatter: function (w) {
                    return Number(userReport?.ev?.length + userReport?.esc?.length)
                  }
                }
              }
            }
          }
        },
      }))
    }
  }, [userReport])

  const handlerDate = (value) => {
    setDate(value)
    const date1 = new Date(value[0]);
    const date2 = new Date(value[1]);

    
    const isSameDate = (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );

    if(isSameDate){
      setPayload((prev) => ({
        ...prev,
        startDate: formatDateToYYYYMMDD(date1) 
      }))
    }else {
      setPayload((prev) => ({
        ...prev,
        startDate: formatDateToYYYYMMDD(date1),
        endDate : formatDateToYYYYMMDD(date2) 
      }))
    }
  }
  
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getReport()
  }, [payload])
  // console.log("Date",date)

  return (
    <div className='d-flex flex-column gap-3'>
      {isLoading ? <div><Loader /></div> :
        <div className='mt-5'>
          <div className='flex rounded mb-5' style={{ backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignContent: 'center' }}>
                <div style={{ padding: '1rem', fontWeight: '500', fontSize: '0.9rem', textAlign: 'center' }}>Escalation Ratings</div>
                <ReactApexChart options={usergraph?.options} series={usergraph?.series} type="radialBar" height={350} />
              </div>
              <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignContent: 'center' }}>
                <div style={{ padding: '1rem', fontWeight: '500', fontSize: '0.9rem', textAlign: 'center' }}>Total Ratings</div>
                <ReactApexChart options={totalRatings?.options} series={totalRatings?.series} type="radialBar" height={350} />
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-end position-relative'>
            <div className='bg-white mb-5 d-flex justify-content-end rounded' style={{cursor:'pointer'}}
             onClick={() => setCalenderToggle(!calenderToggle)}>
              <div className='p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" fill="currentColor" class="bi bi-calendar-range-fill" viewBox="0 0 16 16">
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 7V5H0v5h5a1 1 0 1 1 0 2H0v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9h-6a1 1 0 1 1 0-2z"/>
                </svg>
              </div>
            </div>
            {calenderToggle &&
              (<div className='position-absolute' style={{top:"45px",zIndex:'999'}}>
                <Calendar
                  value={date}
                  onChange={(date) => handlerDate(date)}
                  selectRange={true}
                />
              </div>
              )}
          </div>
          {userReport?.esc?.length > 0 && (<div className='mb-5'>
            <div className='sc-none' style={{ overflowX: 'scroll' }}>
              <Col lg="12" style={{ width: 'max-content' }}>
                <Card>
                  <CardTitle tag="h6" className="border-bottom p-3 mb-0 fw-bold">
                    No of Escalation {userReport?.esc?.length}
                  </CardTitle>
                  <CardBody>
                    <Table bordered>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Email</th>
                          <th>Lead ID</th>
                          <th>Evaluated by</th>
                          <th>Agent Name</th>
                          <th>Team Leader</th>
                          <th>Lead Source</th>
                          <th>User Rating</th>
                          <th>Lead Status</th>
                          <th>Escalation Severity</th>
                          <th>Issue Identification</th>
                          <th>Escalation Action</th>
                          <th>Additional successrmation</th>
                          <th>Audio</th>
                        </tr>
                      </thead>
                      <tbody style={{ overflowX: 'scroll' }}>
                        {userReport?.esc?.map((val, index) => {
                          return (
                            <tr style={{ overflowX: 'hidden' }} key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{val?.useremail}</td>
                              <td>{val?.leadID}</td>
                              <td>{val?.evaluatedby}</td>
                              <td>{val?.agentName}</td>
                              <td>{val?.teamleader}</td>
                              <td>{val?.leadsource}</td>
                              <td>{val?.userrating}</td>
                              <td>{val?.leadstatus}</td>
                              <td>{val?.escalationseverity}</td>
                              <td>{val?.issueidentification}</td>
                              <td>{val?.escalationaction}</td>
                              <td>{val?.additionalsuccessrmation}</td>
                              <td>Loading...</td>
                              {/* <td>
                                {audioUrls[index] ? (
                                    <audio controls>
                                        <source src={audioUrls[index]} type="audio/mpeg" />
                                    </audio>
                                    ) : (
                                    'Loading...'
                                    )}
                                </td> */}
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </div>
          </div>)}
          {userReport?.ev?.length > 0 && (<div>
            <div className='sc-none' style={{ overflowX: 'scroll' }}>
              <Col lg="12" style={{ width: 'max-content' }}>
                <Card>
                  <CardTitle tag="h6" className="border-bottom p-3 mb-0 fw-bold">
                    No of Evaluation {userReport?.ev?.length}
                  </CardTitle>
                  <CardBody>
                    <Table bordered>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Email</th>
                          <th>Lead ID</th>
                          <th>Evaluated by</th>
                          <th>Agent Name</th>
                          <th>Team Leader</th>
                          <th>Mode of Communication</th>
                          <th>Greetings</th>
                          <th>Accuracy & Compliance</th>
                          <th>Building Rapport & Discovery</th>
                          <th>Presenting Solutions & Making the Sale</th>
                          <th>Call Closing & Securing Commitment</th>
                          <th>Bonus Point</th>
                          <th>Evaluation Summary</th>
                        </tr>
                      </thead>
                      <tbody style={{ overflowX: 'scroll' }}>
                        {userReport?.ev?.map((val, index) => {
                          return (
                            <tr style={{ overflowX: 'hidden' }} key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{val?.useremail}</td>
                              <td>{val?.leadID}</td>
                              <td>{val?.evaluatedby}</td>
                              <td>{val?.agentName}</td>
                              <td>{val?.teamleader}</td>
                              <td>{val?.mod}</td>
                              <td>{val?.greetings}</td>
                              <td>{val?.accuracy}</td>
                              <td>{val?.building}</td>
                              <td>{val?.presenting}</td>
                              <td>{val?.closing}</td>
                              <td>{val?.bonus}</td>
                              <td>{val?.evaluationsummary}</td>
                              {/* <td>
                                {audioUrls[index] ? (
                                    <audio controls>
                                        <source src={audioUrls[index]} type="audio/mpeg" />
                                    </audio>
                                    ) : (
                                    'Loading...'
                                    )}
                                </td> */}
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </div>
          </div>)}
        </div>}
    </div>
  )
}

export default AgentReport

