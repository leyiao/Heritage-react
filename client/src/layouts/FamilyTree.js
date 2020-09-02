import React, { Component } from 'react';
import TreeNode  from '../components/TreeNode';
import TreeLine from '../components/TreeLine';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import './FamilyTree.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';

class FamilyTree extends Component {


  render() {
    return (
      <React.Fragment>
        <Jumbotron fluid style={{ backgroundColor: '#00617F', color: 'white', paddingTop: '0px' }}>
          <Container style={{marginTop: '1em'}}>
          <h1><FontAwesomeIcon icon={faSitemap} /> Family Tree</h1>
          <p>Horizontal window size of <b> greater than 1200px</b> recommended for optimal experience</p>
          </Container>
          </Jumbotron>
        <Container>
          <Jumbotron>
              <div>
                <Container>
                <Row>
                    {/* connect Benard and Theodore */}
                    <TreeLine startPoint = "300,20" point2 = "40,20" point3 = "40,20" endPoint = "40,50" height ="51" width = "300"/>
                    <TreeLine startPoint = "1,0" point2 = "1,21" point3 = "1,21" endPoint = "1,21" height ="25" width = "2"/> 
                    <TreeLine startPoint = "0,20" point2 = "350,20" point3 = "350,20" endPoint = "350,50" height ="51" width = "353"/>

                    {/* connect Helen and Alfred */}
                    <TreeLine startPoint = "184,20" point2 = "93,20" point3 = "93,20" endPoint = "93,50" height ="51" width = "184"/>
                    <TreeLine startPoint = "1,0" point2 = "1,21" point3 = "1,21" endPoint = "1,21" height ="25" width = "2"/> 
                    <TreeLine startPoint = "0,20" point2 = "100,20" point3 = "100,20" endPoint = "100,50" height ="51" width = "103"/>
                </Row>
                <Row>
                    <Col sm ={{ span: 1, offset: 0 }}>
                        <TreeNode margin = "0px" name = {"Bernard"} gender = "male" userID = "20" src="https://media.gettyimages.com/photos/forty-something-man-picture-id497129754?s=2048x2048" />
                    </Col>
                    <Col sm={{ span: 1, offset: 0 }}>
                        <TreeNode margin = "30px" name = {"Bernard’s wife"} gender = "female" userID = "21" src="https://static9.depositphotos.com/1729220/1229/i/450/depositphotos_12295191-stock-photo-portrait-of-a-young-woman.jpg"/>
                    </Col>
                    <Col sm={{ span: 1, offset: 1 }}>
                        <TreeNode margin = "0px" name = {"Jacob (Sam)"} gender = "male" userID = "14" src="https://images.unsplash.com/photo-1472066719480-ecc7314ed065?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    </Col>
                    <Col sm={{ span: 0, offset: 0 }}>
                        <TreeNode margin = "50px" name = {"Sarah"} gender = "female" userID = "15" src="https://images.unsplash.com/photo-1511368824105-1a931bcde656?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                    </Col>
                    <Col sm={{ span: 0, offset: 2 }}>
                        <TreeNode margin = "0px" name = {"Theodore"} gender = "male" userID = "16" src="https://www.brisbaneheadshots.com.au/images/galleries/men-corporate/accountants-headshots.jpg" />
                    </Col>
                    <Col sm={{ span: 0, offset: 0 }}>
                        <TreeNode margin = "50px" name = {"Helen"} gender = "female" userID = "17" src="https://st.depositphotos.com/2692701/3171/i/450/depositphotos_31718591-stock-photo-young-woman-with-sunglasses.jpg" />
                    </Col>
                    <Col sm={{ span: 0, offset: 1 }}>
                        <TreeNode margin = "50px" name = {"Alfred"} gender = "male" userID = "18" src="https://static5.depositphotos.com/1005366/466/i/450/depositphotos_4665936-stock-photo-portrait-of-a-young-man.jpg" />
                    </Col>
                </Row>
                </Container>
                <Row>
                    {/* line between Bernard and Bernard's wife */}
                    <TreeLine startPoint = "55,15" point2 = "55,30" point3 = "175,30"  endPoint = "175,15"  height ="31" width = "176"/> 
                    {/* line between Jacob and Sarah */}
                    <TreeLine startPoint = "145,15" point2 = "145,30" point3 = "265,30"  endPoint = "265,15"  height ="31" width = "266"/>

                    {/* line between Theoore and Helen */}
                    <TreeLine startPoint = "225,15" point2 = "225,30" point3 = "330,30"  endPoint = "330,15"  height ="31" width = "331"/> 
                </Row>
                <Row>
                    {/* Line above Sarah */}
                    <TreeLine startPoint = "112,0" point2 = "112,20" point3 = "112,20" endPoint = "112,40" height ="41" width = "113"/>

                    {/* connect Julian and parents */}
                    <TreeLine startPoint = "266,20" point2 = "175,20" point3 = "175,20" endPoint = "175,40" height ="41" width = "266"/> 
                    {/* connect Julie and parents */}
                    <TreeLine startPoint = "1,0" point2 = "1,20" point3 = "1,20" endPoint = "1,40" height ="41" width = "2"/> 
                    {/* connect Joseph and parents */}
                    <TreeLine startPoint = "0,20" point2 = "91,20" point3 = "91,20" endPoint = "91,40" height ="41" width = "93"/>
                    {/* connect Ruth and Cynthia */}
                    <TreeLine startPoint = "245,20" point2 = "117,20" point3 = "117,20" endPoint = "117,40" height ="41" width = "245"/>
                    <TreeLine startPoint = "1,0" point2 = "1,21" point3 = "1,21" endPoint = "1,21" height ="25" width = "2"/> 
                    <TreeLine startPoint = "0,20" point2 = "200,20" point3 = "225,20" endPoint = "225,40" height ="41" width = "228"/>
                </Row>
                <Container style = {{marginTop: "0px"}}>
                <Row>
                    <Col md={{ span: 0, offset: 0 }}>
                        <TreeNode margin = "70px" name = {"Sarah"} gender = "female" userID = "19" src="https://st4.depositphotos.com/7196216/27388/i/450/depositphotos_273886060-stock-photo-portait-shot-year-old-woman.jpg"/>
                    </Col>
                    <Col  md={{ span:0, offset: 1 }}>
                        <TreeNode margin = "40px" name = {"Julian"} gender = "female" userID = "13" src="https://static3.depositphotos.com/1000619/111/i/450/depositphotos_1112087-stock-photo-portrait-of-a-beautiful-woman.jpg" />
                    </Col>
                    <Col md={{ span: 1, offset: 0 }}>
                        <TreeNode margin = "22px" name = {"Julie"} gender = "female" userID = "12" src="https://st.depositphotos.com/2692701/3172/i/450/depositphotos_31720327-stock-photo-young-woman-posing.jpg" />
                    </Col>
                    <Col md={{ span: 1, offset: 0 }}>
                        <TreeNode margin = "30px" name = {"Joseph"} gender = "male" userID = "11" src="https://www.brisbaneheadshots.com.au/images/galleries/men-corporate/executive-headshots-brisbane.jpg" />
                    </Col> 
                    <Col md={{ span: 1, offset: 0 }}>
                        <TreeNode margin = "60px" name = {"Ruth"} gender = "female" userID = "10" src="https://static3.depositphotos.com/1000951/133/i/450/depositphotos_1330055-stock-photo-attractive-smiling-woman.jpg" />
                    </Col>
                    <Col md={{ span: 0, offset: 1 }}>
                        <TreeNode margin = "20px" name = {"Max"} gender = "male" userID = "7" src="https://st.depositphotos.com/2224394/2358/i/450/depositphotos_23586067-stock-photo-happy-young-student.jpg" />
                    </Col>
                    <Col md={{ span: 0, offset: 0 }}>
                        <TreeNode margin = "40px" name = {"Anita"} gender = "female" userID = "8" src="https://st4.depositphotos.com/1046751/19601/i/450/depositphotos_196010400-stock-photo-close-up-beautiful-young-woman.jpg" />
                    </Col>
                    <Col md={{ span: 0, offset: 0}}>
                        <TreeNode margin = "90px" name = {"Cynthia"} gender = "female" userID = "9" src="https://static5.depositphotos.com/1013290/411/i/450/depositphotos_4116282-stock-photo-friendly-teacher.jpg" />
                    </Col>
                </Row>
                </Container>
                <Row style = {{height:"20px"}}>
                    {/* Connect Leon and Mariam */}
                    <TreeLine startPoint = "474,0" point2 = "474,15" point3 = "588,15"  endPoint = "588,0"  height ="16" width = "590"/> 
                    {/* Connect Max and Anita */}
                    <TreeLine startPoint = "120,0" point2 = "120,15" point3 = "216,15"  endPoint = "216,0"  height ="16" width = "219"/> 
                    {/* Below Cynthia */}
                    <TreeLine startPoint = "138,0" point2 = "138,15" point3 = "138,15" endPoint = "138,15" height ="16" width = "141"/>
                </Row>
                <Row>
                    {/* Connect Zoe with parents */}
                    <TreeLine startPoint = "530,20" point2 = "368,20" point3 = "368,20"  endPoint = "368,40"  height ="41" width = "530"/> 
                    {/* Connect Leon with parents */}
                    <TreeLine startPoint = "1,0" point2 = "1,20" point3 = "1,20"  endPoint = "1,40"  height ="40" width = "5"/>

                    {/* Connect Mariam with parents */}
                    <TreeLine startPoint = "230,20" point2 = "100,20" point3 = "100,20"  endPoint = "100,40"  height ="41" width = "230"/> 
                    {/* Connect David with parents */}
                    <TreeLine startPoint = "1,0" point2 = "1,20" point3 = "1,20"  endPoint = "1,40"  height ="40" width = "5"/>

                    {/* Connect Barry with Cynthia */}
                    <TreeLine startPoint = "177,0" point2 = "177,20" point3 = "129,20"  endPoint = "129,40"  height ="41" width = "178"/> 
                    {/* Connect David with Cynthia */}
                    <TreeLine startPoint = "0,20" point2 = "53,20" point3 = "53,20"  endPoint = "53,40"  height ="40" width = "56"/>
                </Row>
                <Container  style = {{marginTop: "0px"}}>
                <Row>
                    <Col md={{ span: 1, offset: 3 }}>
                        <TreeNode margin = "50px" name = {"Zoe"} gender = "female" userID = "3" src="https://st.depositphotos.com/2287479/3346/i/450/depositphotos_33460625-stock-photo-young-lady.jpg" />
                    </Col>
                    <Col md={{ span: 1, offset: 1 }}>
                        <TreeNode margin = "40px" name = {"Leon"} gender = "male" userID = "1" src="https://www.datocms-assets.com/10869/1554107337-kg-at-fronteers-closeup.jpg?auto=compress&fit=crop&fm=jpg&h=300&w=300" />
                    </Col>
                    <Col md={{ span: 0, offset: 0 }}>
                        <TreeNode margin = "70px" name = {"Mariam"} gender = "female" userID = "2" src="https://st3.depositphotos.com/4046139/15077/i/450/depositphotos_150771876-stock-photo-mature-woman-standing-outside-wearing.jpg" />
                    </Col>
                    <Col md={{ span: 0, offset: 0 }}>
                        <TreeNode margin = "80px" name = {"David"} gender = "male" userID = "4" src="https://st.depositphotos.com/2111141/4145/i/450/depositphotos_41453951-stock-photo-confident-businessman.jpg" />
                    </Col>
                    <Col md={{ span: 0, offset: 0 }}>
                        <TreeNode margin = "80px" name = {"Barry"} gender = "female" userID = "5" src="https://st.depositphotos.com/3216063/4254/i/450/depositphotos_42543339-stock-photo-portrait-of-65-yr-old.jpg" />
                    </Col>
                    <Col md={{ span: 0, offset: 0 }}> 
                        <TreeNode margin = "50px" name = {"David"} gender = "male" userID = "6" src="https://st.depositphotos.com/1192060/1657/i/450/depositphotos_16570493-stock-photo-a-business-handshake.jpg" />
                    </Col>
                </Row>
                </Container>
                <Row style = {{height:"20px"}}>
                    {/* short line below Zoe */}
                    <TreeLine startPoint = "368,0" point2 = "368,15" point3 = "368,15" endPoint = "368,15" height ="16" width = "371"/>

                    {/* line between Leon and Mariam */}
                    <TreeLine startPoint = "160,0" point2 = "160,15" point3 = "265,15"  endPoint = "265,0"  height ="16" width = "276"/> 

                    {/* short line below Barry */}
                    <TreeLine startPoint = "253,0" point2 = "253,15" point3 = "253,15" endPoint = "253,15" height ="16" width = "271"/>
                </Row>
                <Row>
                    {/* Connect Joana with Zoe */}
                    <TreeLine startPoint = "368,0" point2 = "368,20" point3 = "315,20"  endPoint = "315,40"  height ="41" width = "369"/> 
                    {/* Connect Alicia with Zoe */}
                    <TreeLine startPoint = "0,20" point2 = "60,20" point3 = "60,20"  endPoint = "60,40"  height ="40" width = "62"/>
                    
                    {/* connect Danya and parents */}
                    <TreeLine startPoint = "157,20" point2 = "73,20" point3 = "73,20" endPoint = "73,40" height ="41" width = "157"/> 
                    {/* connect Sara and parents */}
                    <TreeLine startPoint = "1,0" point2 = "1,20" point3 = "1,20" endPoint = "1,40" height ="41" width = "2"/> 
                    {/* connect Emily and parents */}
                    <TreeLine startPoint = "0,20" point2 = "85,20" point3 = "85,20" endPoint = "85,40" height ="41" width = "93"/>

                    {/* connect Jeremy and Barry */}
                    <TreeLine startPoint = "216,20" point2 = "134,20" point3 = "134,20" endPoint = "134,40" height ="41" width = "216"/> 
                    {/* connect Tamara and Barry */}
                    <TreeLine startPoint = "1,0" point2 = "1,20" point3 = "1,20" endPoint = "1,40" height ="41" width = "2"/> 
                    {/* connect Aviva and Barry */}
                    <TreeLine startPoint = "0,20" point2 = "86,20" point3 = "86,20" endPoint = "86,40" height ="41" width = "93"/>
                </Row>
                <Container  style = {{marginTop: "0px"}}>
                <Row>
                    <Col md={{ span: 0, offset: 3 }}>
                        <TreeNode margin = "10px" name = {"Joana"} gender = "female" userID = "22" src="https://images.unsplash.com/photo-1529148266338-1a3f1f4ec096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                    </Col>
                    <Col md={{ span: 1, offset: 0 }}>
                        <TreeNode margin = "50px" name = {"Alicia"} gender = "female" userID = "23" src="https://images.unsplash.com/photo-1518183301734-84c04db2d41d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80" />
                    </Col>
                    <Col md={{ span: 0, offset: 0 }}> 
                        <TreeNode margin = "50px" name = {"Danya"} gender = "female" userID = "24" src="https://data.whicdn.com/images/302058504/large.jpg?t=1511579073" />
                    </Col>
                    <Col md={{ span: 1, offset: 0 }}>
                        <TreeNode margin = "20px" name = {"Sara"} gender = "female" userID = "25" src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" />
                    </Col>
                    <Col md={{ span: 1, offset: 0 }}>
                        <TreeNode margin = "20px" name = {"Emily"} gender = "female" userID = "26" src="https://images.unsplash.com/photo-1518551049835-5536abd7e004?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
                    </Col>
                    <Col md={{ span: 0, offset: 1 }}>
                        <TreeNode margin = "0px" name = {"Jeremy"} gender = "male" userID = "27" src="https://images.unsplash.com/photo-1521341957697-b93449760f30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                    </Col>
                    <Col md={{ span: 0, offset: 0 }}>
                        <TreeNode margin = "33px" name = {"Tamara"} gender = "female" userID = "28" src="https://images.unsplash.com/photo-1540174401473-df5f1c06c716?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
                    </Col>
                    <Col md={{ span: 0, offset: 0 }}>
                        <TreeNode margin = "36px" name = {"Aviva"} gender = "female" userID = "29" src="https://images.unsplash.com/photo-1474399272551-ae48932dbe00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                    </Col>
                </Row>
                </Container>
              </div>
          </Jumbotron>
        </Container>
      </React.Fragment>
    );
  }
}

export default FamilyTree;
