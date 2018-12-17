/* eslint-disable max-len */
/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Form, Input, Button, Select, Row, Col, Checkbox, Modal } from 'antd';
import styles from '../../../common/Register.less';

const FormItem = Form.Item;
const { Option } = Select;

const item = ({
    count,  // 倒计时
    onChangePrefix, // 改变手机区号
    allowSubmit, // 提交标识
    onChangeAgreement, // 同意协议
    onGetCaptcha, // 验证码倒计时
    onShowModal,
  //  changePassword, // 改变密码
    onSubmitInfo,   //  提交信息
    onChangeMobile,
    phoneNumber,
    modalVisible,
    onHandleCancel,
    form: {
      getFieldDecorator,
      validateFields,
      getFieldValue,
      getFieldError,
    },
  }) => {
  const prefixSelector = getFieldDecorator('region', {
    initialValue: '86',
  })(<Select
    size="large"
    onChange={onChangePrefix}
    style={{ width: 80 }}
  >
    <Option value="86">+86</Option>
  </Select>);
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        onSubmitInfo(values);
      }
    });
  };
  const checkConfirm = (rule, value, callback) => {
    if (value && value !== getFieldValue('userPass')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };
  const getVeriBtnStatus = () => { // 判断获取验证码按钮状态
    if (phoneNumber.length === 11) {
      return getFieldError('userAccount') ? true : count;
    }
    return true;
  };
  return (<div className={styles.main}>
    <h3>激活帐号</h3>
    <Form onSubmit={handleSubmit}>
      <FormItem
        hasFeedback
      >
        {getFieldDecorator('userAccount', {
          validateTrigger: 'onChange',
          rules: [
            {
              required: true,
              message: '请输入手机号！',
            },
            {
              pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
              message: '手机号格式错误！',
            },
          ],
        })(
          <Input
            addonBefore={prefixSelector}
            size="large"
            style={{ width: '100%' }}
            placeholder="请输入11位手机号"
            onChange={onChangeMobile}
          />,
      )}
      </FormItem>
      <FormItem>
        <Row gutter={8}>
          <Col span={16}>
            {getFieldDecorator('verificationCode', {
              validateTrigger: 'onSubmit',
              rules: [
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ],
            })(<Input size="large" placeholder="请输入验证码" />)}
          </Col>
          <Col span={8}>
            <Button
              size="large"
              disabled={getVeriBtnStatus()}
              className={styles.getCaptcha}
              type="primary"
              onClick={onGetCaptcha}
            >
              {count ? `${count} s` : '获取验证码'}
            </Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem
        hasFeedback
      >
        {getFieldDecorator('userName', {
          validateTrigger: 'onBlur',
          rules: [
            {
              required: true,
              message: '请输入姓名！',
            },
            {
              pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/,
              message: '请输入2到10位的中文或英文字符！',
            },
          ],
        })(
          <Input
            size="large"
            type="text"
            placeholder="请输入姓名"
          />,
      )}
      </FormItem>
      <FormItem
        hasFeedback
      >
        {getFieldDecorator('userPass', {
          rules: [
            {
              required: true,
              message: '请输入密码！',
            },
            {
              pattern: /^(?=.*?[A-Z])[\w]{6,12}$/,
              message: '请输入6~12位数字字母组合且至少包含一位大写字母！',
            },
          ],
        })(
          <Input
            size="large"
            type="password"
            placeholder="请输入密码"
          />,
          )}
      </FormItem>
      <FormItem
        hasFeedback
      >
        {getFieldDecorator('repeatUserPass', {
          rules: [
            {
              required: true,
              message: '请输入确认密码！',
            },
            {
              validator: checkConfirm,
            },
          ],
        })(<Input size="large" type="password" placeholder="请输入确认密码" />)}
      </FormItem>
      <FormItem style={{ marginBottom: 8 }}>
        <Checkbox onChange={onChangeAgreement}>我同意辰森云平台</Checkbox>
        <button type="button" onClick={onShowModal} className="btn-link">协议</button>
        <Modal title="用户注册协议" style={{ fontSize: 20 }} width={720} visible={modalVisible} onOk={onHandleCancel} onCancel={onHandleCancel} okText={'确定'} cancelText={'取消'}>
          <div className="registration-protocol height-anto">
            <section>
              <p><strong>本服务协议是北京辰森世纪科技股份有限公司 (以下简称“辰森”)与您就辰森云平台服务（以下简称“服务”）的相关事项所订立的有效合约。您通过盖章、网络页面点击确认或以其他方式选择接受本服务协议，包括但不限于未点击确认本服务协议而事实上使用了辰森云平台服务，即表示您与辰森已达成协议并同意接受本服务协议的全部约定内容。</strong></p>
              <p><strong>关于本服务协议，提示您特别关注<u>限制、免责条款，辰森对您违规、违约行为的认定处理条款，以及管辖法院的选择条款</u>等。限制、免责条款可能以加粗或加下划线形式提示您注意。在接受本服务协议之前，请您仔细阅读本服务协议的全部内容。如果您对本服务协议的条款有疑问的，请咨询辰森服务人员，辰森将向您解释条款内容。如果您不同意本服务协议的任意内容，或者无法准确理解辰森对条款的解释，请不要进行后续操作。</strong></p>
            </section>
            <section>
              <h5>1.总则</h5>
              <p>1.1 辰森云平台（以下简称云平台），系指辰森向客户提供的线上服务平台，其所有权和运营权归北京辰森世纪科技股份有限公司所有。</p>
              <p>1.2 本协议可由辰森根据最新政策及服务的变化而随时进行更新，客户应当及时关注。本站的通知、公告、声明或其它类似内容是本协议的组成部分。</p>
              <p><strong>1.3 在执行本协议过程中如发生纠纷，双方应及时协商解决。协商不成时，任何一方可直接向北京市朝阳区人民法院提起诉讼。</strong></p>
            </section>
            <section>
              <h5>2.客户帐号</h5>
              <p>2.1 客户需按照辰森平台激活注册流程完成相应的账号注册激活操作。若未进行账号激活注册，则无法使用辰森云平台相关服务。</p>
              <p><strong>2.2 客户只能按照激活注册要求使用合法真实有效证件进行激活注册。客户有义务保证密码和帐号的安全，客户利用该密码和帐号进行的一切活动所引起的任何损失或损害，由客户自行承担全部责任。</strong></p>
              <p>2.3如客户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知辰森。因黑客行为或客户的保管疏忽等非辰森行为导致的帐号非法使用，辰森不承担任何责任。</p>
            </section>
            <section>
              <h5>3. 服务内容</h5>
              <p>3.1 本协议中“服务”指：辰森向您提供的云平台服务及相关的软件和网络技术服务，该服务同时需要您购买配套设备予以配合使用。</p>
              <p>3.2 配套设备为服务所必须具备的硬件，由您通过辰森指定的渠道购买并经辰森认证激活后方可使用。</p>
              <p>3.3 辰森按照本协议的相关约定向您提供服务，提供的服务以您在签署本协议时确认的服务内容或您与辰森达成的线下协议约定的内容为准。</p>
            </section>
            <section>
              <h5>4. 服务费用</h5>
              <p>4.1 服务费用将在您签署的线下服务合同中显示，您应按线下服务合同所列明的价格及付款方式予以支付。若双方没有签署线下协议的，则您应支付的服务费用以您签署协议时确认的线上订单显示的价款为准。</p>
              <p>4.2 服务期满双方愿意继续合作的，您至少应在服务期满前7天内支付续费款项，以使服务得以继续进行。如续费时辰森对产品体系、名称或价格进行调整的，双方同意按照届时有效的新的系统、名称或价格履行。</p>
              <p>4.3 辰森保留在您未按照约定支付全部费用之前不向您提供服务和/或技术支持，或者终止服务和/或技术支持的权利。</p>
            </section>
            <section>
              <h5>5 权利义务</h5>
              <p>5.1 您的权利、义务</p>
              <p><strong>5.1.1您同意遵守本服务协议以及服务展示页面的相关管理规范及流程。您了解上述协议及规范等的内容可能会不时发生变更。如本服务协议的任何内容发生变动，辰森将提前30天在辰森云平台适当页面向您做协议版本修改提示。如您不同意辰森对本服务协议相关条款所做的修改，您有权停止使用服务。如您继续使用辰森服务，则视为您接受辰森对本服务协议相关条款所做的修改。</strong></p>
              <p>5.1.2 您应按照线下服务合同或本服务协议的约定支付相应服务费用。</p>
              <p>5.1.3 您承诺：</p>
              <p>5.1.3.1如果您利用辰森提供的服务进行经营或非经营的活动需要获得国家有关部门的许可或批准的，应获得该有关的许可或批准。</p>
              <p>5.1.3.2.除辰森明示许可外，您不得将辰森提供的服务或软件进行出租、出借、销售、转让、非存档目的的拷贝或通过提供分许可、转许可、信息网络等形式供其他任何第三人（包括其关联公司）利用/使用；不得对辰森服务中所包含的软件进行全部或部分地翻译、分解、修改、编译、反编译、汇编、反汇编、反向工程或其他试图从辰森软件导出程序源代码的行为；不破坏、不绕开辰森服务及软件的加密措施或修改其加密信息。</p>
              <p>5.1.3.3 若辰森的服务涉及第三方软件之许可使用的，您同意遵守相关的许可协议的约束。</p>
              <p>5.1.3.4不利用辰森提供的服务从事反动、暴力、色情、赌博、贩毒等违反法律法规及相关规章制度的行为，不利用辰森提供的服务从事违法犯罪活动或侵害他人合法权益的行为。</p>
              <p>5.1.3.5不得不合理占用云平台服务资源，导致云平台服务中断、宕机或出现其他无法访问的情况。</p>
              <p>5.1.3.6不进行任何破坏或试图破坏网络安全的行为（包括但不限于钓鱼，黑客，网络诈骗，网站或空间中含有或涉嫌散播：病毒、木马、恶意代码，及通过虚拟服务器对其他网站、服务器进行涉嫌攻击行为如扫描、嗅探、ARP欺骗、DOS等）。</p>
              <p>5.1.3.7 不进行任何改变或试图改变辰森提供的系统配置或破坏系统安全的行为。</p>
              <p>5.1.3.8 如辰森发现您违反上述条款的约定，有权根据情况采取相应的处理措施，包括但不限于立即终止服务、中止服务或删除相应信息等。</p>
              <p><strong>5.1.4 您对自己存放在云平台系统上的数据以及进入和管理云平台系统上各类产品与服务的口令、密码的完整性和保密性负责。因您维护不当或保密不当致使上述数据、口令、密码等丢失或泄漏所引起的一切损失和后果均由您自行承担。</strong></p>
              <p>5.1.5 您应向辰森提交执行本服务条款的联系人和管理客户网络及云平台上各类产品与服务的人员名单和联系方式并提供必要的协助。如以上人员发生变动，您应自行将变动后的信息进行在线更新并及时通知辰森。因您提供的人员的信息不真实、不准确、不完整，以及因以上人员的行为或不作为而产生的结果，均由您负责。</p>
              <p>5.1.6 您对您存放在云平台系统上的数据内容负责，如因上传的公开信息违反法律法规、部门规章或国家政策，由此造成的全部结果及责任由您自行承担。</p>
              <p>5.1.7 为保证购买的服务正常使用，客户应通过辰森购买配合辰森云平台软件系统使用的硬件产品（如有）；硬件产品的交付时间应预留充足的备货时间，若因生产厂家延迟导致的交货延误，客户同意不追究辰森责任。辰森向客户交付硬件产品的方式包括邮寄、送货上门等方式，具体按照双方在线下《服务合同》约定的交付方式为准。客户收货后，应向辰森出具收货单并应在收货后2个工作日内验货，超过2个工作日未提出异议的，视为验收合格。</p>
              <p><strong>5.1.8您了解辰森无法保证其所提供的服务毫无瑕疵，但辰森将不断提升服务质量及服务水平。您同意：即使辰森提供的服务存在瑕疵，但若非辰森故意或重大过失造成的，其将不被视为辰森违约。您同意和辰森一同合作解决上述瑕疵问题。</strong></p>
              <p>5.2 辰森的权利、义务</p>
              <p>5.2.1 辰森应按照服务条款约定提供服务。</p>
              <p>5.2.2 辰森为付费客户提供售后电话咨询服务，解答客户在使用中的问题。</p>
              <p>5.2.3 辰森将消除您非人为操作所出现的故障，但因您原因和/或不可抗力以及非辰森控制范围之内的事项除外。</p>
            </section>
            <section>
              <h5>6. 客户数据的保存、销毁与下载</h5>
              <p>6.1 您存放在云平台上的数据，除执行您的服务指令外，不进行任何未获授权的使用及披露，除非：</p>
              <p>6.1.1 根据法律的有关规定、行政或司法等机构的要求，向第三方或者行政、司法等机构披露；</p>
              <p>6.1.2 您和辰森另行协商一致的；</p>
              <p>6.1.3 如果您出现违反中国有关法律法规的情况，需要向第三方披露；</p>
              <p>6.1.4 为提供您所要求的软件或服务，而必须和第三方分享您数据；但前述披露仅在为您提供服务的必要范围内，且辰森要求第三方承诺，第三方应仅为提供服务目的使用其获得的数据且按照不低于本服务条款的标准对其获得的数据承担保密义务。</p>
              <p><strong>6.2 您理解为了您正常使用辰森云平台服务，我们将对您使用云平台服务产生的数据和信息进行储存。当您停止使用我们提供的服务后，您存储的数据我们有权进行删除且您理解我们没有继续存储的义务。</strong></p>
              <p><strong>6.3您同意我们对您使用辰森云平台系统产生的数据享有相关的权益，在去除您的标识数据后，我们有权在合法的前提下对这些数据进行合理使用。同时，因这些数据是使用辰森云平台服务产生的，因此，您在未获得辰森同意的前提下，不得下载或导出相关原始数据，您的经营报表数据除外。</strong></p>
            </section>
            <section>
              <h5>7. 知识产权</h5>
              <p>7.1 您应保证提交辰森的素材、对辰森服务的使用及使用辰森服务所产生的成果未侵犯任何第三方的合法权益。如有第三方基于侵犯版权、侵犯第三人之权益或违反中国法律法规或其他适用的法律等原因而向辰森提起索赔、诉讼或可能向其提起诉讼,则您应赔偿辰森因此承担的费用或损失，并使辰森完全免责。</p>
              <p>7.2 如果第三方机构或个人对您使用辰森服务所涉及的相关素材的知识产权归属提出质疑或投诉，您有责任出具相关知识产权证明材料，并配合辰森相关投诉处理工作。</p>
              <p>7.3 您承认辰森向您提供的任何资料、技术或技术支持、软件、服务等的知识产权均属于辰森或第三方所有。除辰森或第三方明示同意外，您无权复制、传播、转让、许可或提供他人使用上述资源，否则应承担相应的责任。</p>
            </section>
            <section>
              <h5>8. 保密条款</h5>
              <p>8.1 保密资料指由一方向另一方披露的所有技术及非技术信息(包括但不限于产品资料，产品计划，价格，财务及营销规划，业务战略，客户信息，客户数据，研发资料，软件硬件，应用数据接口，技术说明，设计，特殊公式，特殊算法等)。</p>
              <p>8.2 本服务协议任何一方同意对获悉的对方之上述保密资料予以保密，并严格限制接触上述保密资料的员工遵守本条之保密义务。除非国家机关依法强制要求或上述保密资料已经进入公有领域外，接受保密资料的一方不得对外披露。</p>
              <p>8.3 本服务条款双方明确认可保密资料是双方的重点保密信息并是各自的重要资产，本服务条款双方同意尽最大的努力保护上述保密资料等不被披露。一旦发现有上述保密资料泄露事件，双方应合作采取一切合理措施避免或者减轻损害后果的产生。</p>
              <p>8.4 本条款不因本服务条款的终止而失效。</p>
            </section>
            <section>
              <h5>9. 期限与终止</h5>
              <p>9.1 本协议自您点击同意之日起生效。您使用辰森云平台具体服务的期限自服务实际开通之日起计算，到期日以您开通服务时确认的时间为准，各项具体服务的到期日会在系统中予以标明，若未标明，则其期限以本协议及您与辰森签署的线下合同的期限确定。</p>
              <p>9.2 发生下列情形，服务期限提前终止：</p>
              <p>9.2.1 双方协商一致提前终止的；</p>
              <p>9.2.2 您严重违反本服务协议（包括但不限于：a.您未按照协议约定履行付款义务，及/或b.您严重违反法律规定等），辰森有权提前终止服务，并不退还您已经支付的费用；</p>
              <p>9.2.3 您理解并充分认可，虽然辰森已经建立（并将根据技术的发展不断完善）必要的技术措施来防御包括计算机病毒、网络入侵和攻击破坏等危害网络安全的事项或行为（以下统称该等行为），但鉴于网络安全技术的局限性、相对性以及该等行为的不可预见性，因此如因您遭遇该等行为而给辰森或者辰森云平台的其他的网络或服务器（包括但不限于本地及外地和国际的网络、服务器等）带来危害，或影响云平台与国际互联网或者云平台与特定网络、服务器及云平台内部的通畅联系，辰森可决定暂停或终止服务，如果终止服务的，将按照实际提供服务月份计算（不足一个月的按一个月计）服务费用，将剩余款项（如有）返还。</p>
              <p> 9.2.4 辰森可提前30天在辰森云平台上通告或给您发网站内通知或书面通知的方式终止本服务协议。届时辰森应将您已支付但未消费的款项退还。</p>
            </section>
            <section>
              <h5>10. 违约责任</h5>
              <p>10.1 本服务条款任何一方违约均须依法承担违约责任。</p>
              <p>10.2 您理解，鉴于计算机、互联网的特殊性，下述情况不属于辰森违约：</p>
              <p>10.2.1 辰森在进行服务器配置、维护时，需要短时间中断服务；</p>
              <p>10.2.2 由于Internet上的通路阻塞造成您网站访问速度下降。</p>
              <p>10.3 如因辰森原因，造成您连续72小时不能正常使用服务的，您可以终止服务，但非辰森控制之内的原因引起的除外。</p>
              <p>10.4 在任何情况下，辰森均不对任何间接性、后果性、惩戒性、偶然性、特殊性的损害，包括您使用云平台服务而遭受的利润损失承担责任（即使您已被告知该等损失的可能性）。</p>
              <p>10.5 在任何情况下，辰森对本服务条款所承担的违约赔偿责任总额不超过违约服务对应之服务费总额。</p>
            </section>
            <section>
              <h5>11. 不可抗力</h5>
              <p>11.1 因不可抗力或者其他意外事件，使得本服务条款的履行不可能、不必要或者无意义的，遭受不可抗力、意外事件的一方不承担责任。</p>
              <p>11.2 不可抗力、意外事件是指不能预见、不能克服并不能避免且对一方或双方当事人造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行等以及社会事件如战争、动乱、政府行为、电信主干线路中断、黑客、网路堵塞、电信部门技术调整和政府管制等。</p>
            </section>
            <section>
              <h5>12. 附则</h5>
              <p>12.1辰森在云平台相关页面上的服务说明、价格说明是本服务条款不可分割的一部分。如果网站相关页面上的服务说明、价格说明与本服务协议有不一致之处，以本服务协议为准。</p>
              <p>12.2 如果任何条款在性质上或其他方面理应地在此协议终止时继续存在，那么应视为继续存在的条款，这些条款包括但不局限于保证条款、保密条款、知识产权条款、法律适用及争议解决条款。</p>
            </section>
          </div>
        </Modal>
      </FormItem>
      <FormItem>
        <Button
          size="large"
          loading={item.submitting}
          className={styles.submit}
          type="primary"
          htmlType="submit"
          disabled={!allowSubmit}
        >
          注册
        </Button>
        <Link className={styles.login} to="/system/cloud/home">
          使用已有账户登录
        </Link>
      </FormItem>
    </Form>
  </div>);
};
item.propTypes = {
  form: PropTypes.object,
  count: PropTypes.number,
  allowSubmit: PropTypes.bool,
  phoneNumber: PropTypes.string,
  modalVisible: PropTypes.bool,
  onChangePrefix: PropTypes.func,
  onHandleCancel: PropTypes.func,
  onChangeAgreement: PropTypes.func,
  onGetCaptcha: PropTypes.func,
  onShowModal: PropTypes.func,
  onSubmitInfo: PropTypes.func,
  onChangeMobile: PropTypes.func,
};

export default Form.create()(item);
