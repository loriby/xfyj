<template>
  <div class="mod-home">
    <el-carousel height="188px">
      <el-carousel-item v-for="item in 1" :key="item">
        <h3 class="small">
          <img src="~@/assets/img/banner.jpg" alt />
        </h3>
      </el-carousel-item>
    </el-carousel>
    <el-row class="yun-box" :gutter="30">
      <el-col :span="8">
        <div class="grid-content bg-purple">云课堂</div>
      </el-col>
      <el-col :span="8">
        <div @click="goList(false)" class="grid-content bg-purple">云评选</div>
      </el-col>
      <el-col :span="8">
        <div @click="goList(true)" class="grid-content bg-purple">云展览</div>
      </el-col>
    </el-row>
    <div class="nav-box">
      <el-tabs class="tabs-body" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane flag="newsFlag" label="新闻动态" name="first">新闻动态</el-tab-pane>
        <el-tab-pane flag="activityFlag" label="活动详情" name="second">活动详情</el-tab-pane>
        <el-tab-pane flag="ruleFlag" label="投票规则" name="third">投票规则</el-tab-pane>
        <el-tab-pane flag="opusFlag" label="作品" name="fourth">作品</el-tab-pane>
      </el-tabs>
      <el-row>
        <el-col :span="24">
          <div style="text-align: center;" class="grid-content">
            <el-input
              class="search-box"
              prefix-icon="el-icon-search"
              v-model="input"
              placeholder="请输入作品名称或者作者姓名"
            ></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 内容panls区 -->
    <div class="content-box">
      <div v-if="newsFlag" class="news-content">
        <div class>
          <div class="graTit">
            <span class="graTitBox">
              <b>新闻动态</b>
              <br />
            </span>
          </div>
        </div>
        <div class="item-content">
          <el-row class="news-item" v-for="item in 20" :key="item" :gutter="20">
            <el-col :span="4">
              <div @click="newsDetail()" class="grid-content">
                <img src="~@/assets/img/news.jpg" alt />
              </div>
            </el-col>
            <el-col :span="20">
              <div @click="newsDetail()" class="grid-content">
                近日，国家艺术基金2016年度资助项目初评开始，共有6491个申报主体，向艺术基金申报了7245个项目，比2015年度增加了2843项，同比增幅为64.6%。如此踊跃地申报，既表明今年的评审竞争势必更加激烈，也表明各地已适应了“艺术项目制管理”的新模式。
                项目制管理”是个经济术语，上世纪八十年代以来广泛运用于经济领域，但大量引入到艺术领域还是一件新鲜事。“三年有成”，通过三年的摸索，国家艺术基金的“艺术项目制管理”已走入正轨，这是文化体制改革的新实践，是提升文化治理能力的新探索。大力支持艺术创作生产传播，推动舞台艺术和美术领域作品数量与质量齐进，国家艺术基金正努力成为艺术繁荣发展的“孵化器”和“发动机”。
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div v-if="newsDetailFlag" class="news-detail-content">
        <div class>
          <div class="graTit">
            <span class="graTitBox">
              <b>相关新闻</b>
              <br />
            </span>
          </div>
        </div>
        <div class="nav-bar">
          <span @click="goBack('newsFlag','newsDetailFlag')">新闻动态</span>
          >
          <span>正文</span>
        </div>
        <div class="item-content">
          <h1 class>国家艺术基金：“艺术项目制管理”走入正轨</h1>
          <div class="info">
            <div>
              <span class="time">2016-05-12 11:04:55</span>
              <span>
                <em>来源：光明网</em>
              </span>
            </div>
          </div>

          <div class="detail" style="font-size: 18px;">
            <p style="text-align: center;">
              <img alt src="https://wximg1.artimg.net/news/201605/2016050817341283498.jpg" />
            </p>

            <p>近日，国家艺术基金2016年度资助项目初评开始，共有6491个申报主体，向艺术基金申报了7245个项目，比2015年度增加了2843项，同比增幅为64.6%。如此踊跃地申报，既表明今年的评审竞争势必更加激烈，也表明各地已适应了“艺术项目制管理”的新模式。</p>

            <p>“项目制管理”是个经济术语，上世纪八十年代以来广泛运用于经济领域，但大量引入到艺术领域还是一件新鲜事。“三年有成”，通过三年的摸索，国家艺术基金的“艺术项目制管理”已走入正轨，这是文化体制改革的新实践，是提升文化治理能力的新探索。大力支持艺术创作生产传播，推动舞台艺术和美术领域作品数量与质量齐进，国家艺术基金正努力成为艺术繁荣发展的“孵化器”和“发动机”。</p>

            <p>
              <strong>“百里挑一”的项目形成机制</strong>
            </p>

            <p>虽然来自偏远的四川省凉山彝族自治州，但彝族的首部民族歌剧作品《彝红》却是一路“过关斩将”，通过审核、初评、复评、答辩，成为国家艺术基金首批资助项目。《彝红》能征服评委，不仅是歌剧的选题立意好，把1935年红军长征过凉山，刘伯承与彝族头人果基小叶丹歃血为盟的故事搬上舞台，更为重要的是评委被其艺术质量所折服，歌词清爽优美，秉承彝族山歌的特点，音乐富有史诗色彩，旋律简单好记，非常容易引发共鸣。</p>

            <p>像《彝红》一样，国家艺术基金每个资助项目都是“百里挑一”、“过五关斩六将”，由评审专家们精挑细选出来的。“大比例使用专家，引入专家评审，选优拔萃，提倡竞争，充分让申报项目比优势、比特点、比质量、比实力，从过去的‘相马’变‘赛马’;从行政层层审批变为集中申报和集中评审;从只面向文化系部内变为面向全社会，不分体制内外、国有民营;从只‘管脚下’变为要‘管天下’。”国家艺术基金管理中心主任韩子勇一口气道出了国家艺术基金“项目制管理”的特点。</p>

            <p>果然，记者翻阅近两年来的国家艺术基金立项名单发现，资助范围包括十几个大的艺术门类和近80个小的艺术品种，项目主体丰富多样，既有“高大上”的艺术机构，又有新出现的“小而精”的特色机构，还有不少体制外“单打独斗”的艺术家，不再以身份论英雄，比的是项目的质量、价值、可行性和主体的“经验值”。大家都在同一起跑线上，接受同一种规则，要填报同样的申报材料，走过同样的评审程序，体现了公开、平等，在同一个平台上充分展示和竞争。</p>

            <p>国家艺术基金2014年项目综合立项率约为10%，确定了393个资助项目，资助金额4.03亿元;2015年项目综合立项率约为16%，确定了728个立项资助项目，资助总金额约为7.5亿元。如此高的“淘汰率”，怎样能取舍?怎样去把好质量关?在国家艺术基金理事长蔡武看来，“关键是要发挥充分发挥专家的作用，尊重艺术规律，保证项目评审的公正性，才能推出更多的名家、名作。”三年来，国家艺术基金建立了6000人的专家库，涉及艺术、管理、财务、审计等多个方面，而且每年都要对专家进行培训，要求专家在咨询、评审、监督的全过程中，坚持高标准严要求、选优择优。</p>

            <p>
              <strong>严密规范的全流程监督机制</strong>
            </p>

            <p>“实施不当，小心进入黑名单!国家艺术基金的申报主体必须是执行主体，对于弄虚作假，借壳申报的单位，一经发现将被列入黑名单，再次申报项目时将被限报。”此严厉提醒出现在了国家艺术基金的官网上。原来，在2014年度的项目结项验收中，发现有极个别申报主体在项目执行过程中并没有具体参与项目的实施，而是将项目整体转包给第三方。这一现象引起了国家艺术基金的高度警觉。因此，国家艺术基金特别重申：项目申报主体必须同时是项目执行主体，国家艺术基金资助的项目一定是谁申报、谁实施、谁负责。</p>

            <p>发现问题，及时解决问题。中央财经大学文化经济研究院院长魏鹏举评价说，三年来国家艺术基金加强制度建设，围绕资助项目征集评审、实施监督、结项验收、成果运用做了多项开创性的工作，走通了指南发布、项目申报、专家评审、项目实施监督和宣传推广的全流程，确保管理和运行全面做到公平公正、信息透明、监督有力。</p>

            <p>“过去，文艺单位重艺术创作，在财务和管理方面比较粗放、随意，而获得国家艺术基金资助后，以项目执行为主线，要签合同，要有具体的责任主体、实施目标，还有监督和审计，哪些钱该花哪些不能花，钱应该花到哪里，都是有讲究和规范的，项目实施的目标、期限、团队、责任都有章可循。”山西省话剧院院长梁军深有感触地谈起“项目制管理”倒逼文化艺术机构管理上台阶的体会，“国家艺术基金项目评上不容易，花钱更严格”。</p>

            <p>改变还在悄然进行，记者从一张节目单中看出了新变化。过去，一台演出制作的挂名者满满当当好几页，各级宣传部、文化厅层层领导都无一遗漏，再加上“创而优则仕”、“演而优则仕”，艺术单位行政色彩浓，院团的各级领导不管是否参与都要挂上名字，密密麻麻列一大串，而主要艺术家的名字却被淹没其中。现在实施项目制后，有名字就有任务和责任，项目策划和实施都是扎扎实实做事的艺术家，挂名者也就少了，节目单变得简化、清爽了许多，真正让项目的执行者----艺术家成为“主角”。</p>

            <p>“通过选优拔萃、扶优扶强，培育好作品、推出好人才，促进形成良好的艺术生态。”文化部部长雒树刚希望，国家艺术基金努力探索适应治理体系和治理能力现代化要求、符合我国实际的基金管理规律，进一步提高艺术基金运作的科学化、专业化水平。</p>

            <p>
              <strong>优中选优的项目提升机制</strong>
            </p>

            <p>记者注意到，在国家艺术基金2016年度的申报指南中，少了对“加工修改”项目的资助。对此，韩子勇回应说，从2014年一开始资助项目中是有“加工修改”的，但经过这两年的消化，优秀作品的“加工修改”项目基本已结项，因此，今年就特别强调“原创”，而且与过去不同的是，除了大型舞台剧的原创外，还支持小型项目的原创，让好创意、好作品不断涌现，也给更多新人机会，保持艺术生产的活力。</p>

            <p>“没有国家艺术基金的支持，不可能打破行政区划，完成跨六个省区的演出和展览。”内蒙古民族艺术剧院院长刘春良参与了晋冀蒙陕甘宁六省区地方戏曲及民乐民歌“三展”联动项目，体会到国家艺术基金促进演出交流和演出市场发育的良苦用心。“原来省市院团大多只能局限在本省区演出，最多去北京、上海演出，很少去其他省演出。国家艺术基金重点资助了传播推广和交流项目，打破行政藩篱，追随文脉分布与有效观众，组织跨省跨区域的巡回演出，让好的作品传播得更远，促进了优质文化资源在更大范围的共享。”</p>

            <p>2016年度国家艺术基金资助项目的一大亮点是创新性地推出了“滚动资助项目”。国家艺术基金理事会副理事长、秘书长赵少华介绍，经过前两年的项目实践，各项目主体对“项目制”已经有了一定认识和经验，国家艺术基金精益求精，继续做好项目成果管理工作。从2014年度已完成结项的一般项目中，本着“坚持标准、宁缺勿滥”的原则，根据专家评审意见，参考网上投票结果，优中选优、层层筛选出8个大型舞台剧和作品，47名青年艺术家的103幅美术、书法、摄影作品作为滚动资助项目。这是艺术基金根据艺术创作生产规律，探索“项目制”管理方式，努力扩大艺术基金资助效益，推动精品力作与优秀人才的产生所采取的一项新举措。</p>

            <p>“艺术创作生产是一个艰难的过程，而精品的产生更是一个漫长而复杂的过程，都有一个反复修改、锤炼、提高的过程。”蔡武认为，着重强调了大型舞台剧和作品滚动资助项目的工作重心是“聚焦于改，以改为主”，广泛听取专家和群众的意见，真正“问需于民、问计于民”，能克服舞台艺术传播面有限，受众狭窄的天然缺陷，积极探索建立观众信息反馈机制和群众评价机制，把老百姓喜欢不喜欢、满意不满意作为衡量成败的标准。而美术、书法、摄影创作人才滚动资助项目，做好对青年艺术家收藏作品的出版、展览与推广工作，有利于发现和培养名家。这样“抓精品、攀高峰”，努力推出思想性、艺术性、欣赏性完美统一的作品，才能是经得起人民评价、专家评价、市场检验的优秀作品。</p>
          </div>
        </div>
      </div>

      <div v-if="activityFlag" class="activity-content">
        <div class>
          <div class="graTit">
            <span class="graTitBox">
              <b>活动详情</b>
              <br />
            </span>
          </div>
        </div>
        <div class="item-content">
          <div class="activity">
            <p>
              &nbsp; &nbsp; &nbsp;&nbsp; 国家艺术基金美术、书法、摄影创作人才滚动资助项目是对一般资助项目成果开展宣传推广。由国家艺术基金组织，在已获得资助并结项的美术、书法、摄影创作人才资助项目中，评审出优秀项目成果，组织出版和展览，进行传播交流推广。
              <br />&nbsp; &nbsp; &nbsp; &nbsp;国家艺术基金2014年共立项资助了93个美术、书法、摄影创作人才项目。历经为期一年的组织实施，多数项目执行顺利，并参与了结项验收工作。为积极探索创新国家艺术基金资助项目评审和宣传推广方式，将专家评价与群众意见有机地统一起来，国家艺术基金管理中心在雅昌艺术网开展线上投票活动。
              <br />&nbsp; &nbsp; &nbsp; &nbsp;管理中心将根据专家对结项验收项目成果的评定，参考网上投票情况，组织开展有关成果宣传推广工作。
            </p>

            <p>&nbsp;</p>

            <p>
              <strong>附件：</strong>
            </p>

            <p style="text-align: center;">
              <strong>国家艺术基金美术、书法、摄影创作人才</strong>
              <strong>滚动资助项目作品（2016年度）名单</strong>
            </p>

            <p>
              <strong>一、中国画</strong>
            </p>

            <p>1．张 博 《再不封闭的山村》</p>

            <p>2．籍洪达 《心印寂静—花鸟画组图创作》</p>

            <p>3．翟书同 《特战神兵》</p>

            <p>4．褚晓莉 《丝路使者—细君公主》</p>

            <p>5．吕 印 《明代丽江木氏土司像复制》</p>

            <p>6．刘同顺 《甲午战争120周年祭》</p>

            <p>7．杨 军 《寄梦丹霞》系列组画</p>

            <p>8．李德惠 《红楼梦》组画</p>

            <p>9．彭震中 《汉口租界历史建筑之当代水墨》</p>

            <p>10．秦 晖 《广西少数民族村寨山水画创作》</p>

            <p>11．杨 柳 《都市系列》</p>

            <p>12．陈 健 《大运河·我的家》</p>

            <p>
              <strong>二、书法</strong>
            </p>

            <p>1．张晓东 《中国梦（57方篆刻组印）》</p>

            <p>2．胡朝霞 《楹联书法创作》</p>

            <p>3．唐朝轶 《小楷书老子道德经长卷》</p>

            <p>4．纪 松 《李白诗歌十幅》</p>

            <p>5．袁文甲 《古人书论选》</p>

            <p>6．李明桓 《传统文化名句组印》</p>

            <p>
              <strong>三、漆画</strong>
            </p>

            <p>1．简锦斯 《中国漆·本生故事》</p>

            <p>
              <strong>四、工艺美术</strong>
            </p>

            <p>1．宋海峰 《长白山纤维编织艺术创作》</p>

            <p>2．李素芳 《山之意》</p>

            <p>3．李明谦 《青韵系列》</p>

            <p>4．楚 艳 《中国传统天然染缬艺术服饰》</p>

            <p>5．韩纳黎 《家居生活艺术的再创作》</p>

            <p>6．熊开波 《华夏器韵》</p>

            <p>7．周 震 《茶则与勺子》</p>

            <p>
              <strong>五、油画</strong>
            </p>

            <p>1．刘玉龙 《中国梦—造船》</p>

            <p>2．刘 刚 《云南文山》系列创作</p>

            <p>3．边小强 《佤族文化》系列创作</p>

            <p>4．孟新宇 《四季太行》</p>

            <p>5．刘 悦 《手机围城》</p>

            <p>6．程建利 《寂静的纳吾错》</p>

            <p>7．周 亭 《记忆的味道》系列创作</p>

            <p>8．郭仁海 《傣家》</p>

            <p>9．蒯连会 《春水东流》</p>

            <p>10．王裕亮 《陈宝琛》</p>

            <p>11．孔庆雄 《布里亚特的冬日—思》</p>

            <p>
              <strong>六、水彩（粉）画</strong>
            </p>

            <p>1．焦立强 《工业备忘录》</p>

            <p>2．吴 洁 《城》</p>

            <p>
              <strong>七、版画</strong>
            </p>

            <p>1．刘益春 《幼学杂字》</p>

            <p>2．傅 洁 《时空事迹》</p>

            <p>3．彭 伟 《盛世益州》</p>

            <p>4．尹小勇 《回顾与展望》</p>

            <p>5．吴娅妮 《红军东征》</p>

            <p>
              <strong>八、摄影</strong>
            </p>

            <p>1．胡群山 《血色—史迪威公路》</p>

            <p>2．郭月霞 《河南传统手工技艺》</p>

            <p>3．范南丹 《边地行走》</p>
          </div>
        </div>
      </div>

      <div v-if="ruleFlag" class="rule-content">
        <div class>
          <div class="graTit">
            <span class="graTitBox">
              <b>投票规则</b>
              <br />
            </span>
          </div>
        </div>
        <div class="item-content">
          <p style="text-align:center;font-size:16px;font-weight:bold;">国家艺术基金</p>
          <p style="text-align:center;font-size:16px;font-weight:bold;">美术、书法、摄影创作人才资助项目作品</p>
          <p style="text-align:center;font-size:16px;font-weight:bold;">网络投票规则</p>
          <p>&nbsp;</p>
          <p>资助项目作品网络投票由国家艺术基金管理中心与雅昌艺术网合作组织。</p>

          <p>一、投票规则</p>
          <p>1.投票时间：2016年1月23日至2016年2月20日。</p>
          <p>2.投票时间间隔：24小时。</p>
          <p></p>
          <p>3.投票次数限制：每个ID用户每天可分别为每件作品投1次票。</p>
          <p>二、投票流程</p>
          <p>1.进入国家艺术基金官网通过链接进入雅昌艺术网首页，或直接登录雅昌艺术网，根据提示进行注册。</p>
          <p>2.进入“国家艺术基金美术、书法、摄影创作人才资助项目作品”页面，进入作品列表（也可以通过输入关键字进行搜索)。</p>
          <p>3.选择作品并投票。</p>
          <p>三、声明</p>
          <p>1.反对作弊、刷票、拉票、买票行为。</p>
          <p>2.参与评选的图片内容，未经国家艺术基金许可，任何人或机构不得擅自转载或发表。</p>
          <p>3.本次活动的最终解释权归国家艺术基金管理中心所有。</p>
        </div>
      </div>

      <div v-if="opusFlag" class="opus-content">
        <div class>
          <div class="graTit">
            <span class="graTitBox">
              <b>作品</b>
              <br />
            </span>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col v-for="(item, index) in opusArry" :key="index" :span="5">
            <div class="grid-content">
              <el-button>{{item.name}}</el-button>
            </div>
          </el-col>
        </el-row>
        <div class="item-content">
          <el-row :gutter="20">
            <el-col :span="8" v-for="(o, index) in 9" :key="index">
              <el-card :body-style="{ padding: '0px' }">
                <img @click="goDetail()" class="image" src="~@/assets/img/zuopin.jpg" alt />
                <div style="padding: 14px;position: relative;">
                  <span @click="goDetail()" class="title">古人书论选</span>
                  <div class="bottom clearfix">
                    <time class="time">袁文甲</time>
                  </div>

                  <div class="ticket-opr">
                    <div class="ticket-opr-item">
                      <el-button :disabled="true" size="mini">投票结束</el-button>
                      <span>42552 票</span>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      activeName: 'first',
      newsDetailFlag: false,
      newsFlag: true,
      activityFlag: false,
      ruleFlag: false,
      opusFlag: false,
      flagArry: ['newsFlag', 'activityFlag', 'ruleFlag', 'opusFlag'],
      opusArry: [
        { name: '全部', id: '' },
        { name: '国画', id: '' },
        { name: '书法', id: '' },
        { name: '工艺美术', id: '' },
        { name: '漆画', id: '' },
        { name: '油画', id: '' },
        { name: '水彩水粉', id: '' },
        { name: '版画', id: '' },
        { name: '雕塑', id: '' },
        { name: '摄影', id: '' }
      ]
    }
  },

  methods: {
    // tabs切换
    handleClick (tab, event) {
      this.newsDetailFlag = false
      this.flagArry.forEach(item => {
        if (tab.$attrs.flag === item) {
          this[item] = true
        } else {
          this[item] = false
        }
      })
    },

    // 查看作品详情
    goDetail () {
      this.$router.push({ name: 'detail', query: { path: 'home' } })
    },

    // 作品展示及投票
    goList (showFlag) {
      this.$router.push({ name: 'allList', query: { showFlag: showFlag } })
    },

    // 查看新闻详情
    newsDetail () {
      this.flagArry.forEach(item => {
        this[item] = false
      })
      this.newsDetailFlag = true
    },

    // 详情后返回对应页面
    goBack (backFlag, NowFlag) {
      this.flagArry.forEach(item => {
        if (backFlag === item) {
          this[item] = true
        } else {
          this[item] = false
        }
      })
      this[NowFlag] = false
    }
  }
}
</script>

<style lang="scss">
.mod-home {
  line-height: 1.5;
  width: 980px;
  margin: 0 auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 188px;
  height: 188px;
  margin: 0;
}

.el-carousel__item h3 img {
  /* height: 100%; */
  width: 100%;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.nav-box {
  background: #b50103;
  height: 143px;
}

.el-tab-pane {
  display: none;
}

.tabs-body {
  width: 980px;
  margin: 0 auto;
}
.el-tabs__nav-scroll {
  text-align: center;
}
.el-tabs__item {
  color: #fff;
  opacity: 0.5;
  font-size: 14px;
  font-weight: normal;
}

.el-tabs__nav {
  float: none;
}

.el-tabs__nav-wrap::after {
  background: #fff;
  height: 1px;
  opacity: 0.3;
}

.el-tabs__item.is-active {
  color: #fff;
  opacity: 1;
}

.el-tabs__active-bar {
  display: none;
}

.el-tabs__item:hover {
  color: #fff;
  opacity: 1;
}

.el-tabs__header {
  padding-top: 10px;
}

.search-box {
  width: 280px;
}

.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border: none;
}

.el-input--medium .el-input__inner {
  height: 30px;
  line-height: 30px;
  outline: none;
}

.el-input--medium .el-input__icon {
  line-height: 30px;
}

.content-box {
  width: 980px;
  margin: 0 auto;
  min-height: 147px;
  padding-top: 82px;
}

.graTit {
  height: 20px;
  text-align: center;
  border-bottom: 1px solid #cfcfcf;
  _overflow: hidden;
  margin-bottom: 45px;
}

.graTitBox {
  padding: 0 30px;
  background: #ffffff;
  display: inline-block;
  _position: relative;
}

.graTit b {
  line-height: 40px;
  font-size: 24px;
  color: #939393;
  font-weight: normal;
}

.item-content img {
  width: 100%;
}

.rule-content .item-content,
.activity-content .item-content {
  padding: 60px 90px 90px;
  background: #f2f2f2;
}
.rule-content .item-content p,
.activity-content .item-content p {
  color: #333333;
}

.el-col-5 {
  width: 20%;
  margin-bottom: 20px;
}

.opus-content .grid-content button {
  width: 178px;
  height: 38px;
  text-align: center;
  font-size: 16px;
}

.grid-content .el-button:focus,
.grid-content .el-button:hover {
  color: #fff;
  background: #000;
  border: 1px solid #000000;
}

.el-col-8 {
  margin-bottom: 20px;
}

.time {
  color: #999;
  font-size: 12px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
  cursor: pointer;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.ticket-opr {
  position: absolute;
  right: 10px;
  top: 10px;
}

.ticket-opr button {
  margin-bottom: 7px;
}
.ticket-opr span {
  display: block;
  text-align: center;
}

.ticket-opr-item {
  position: relative;
}

.ticket-opr-item::after {
  content: "";
  position: absolute;
  width: 1px;
  background: #f2f2f2;
  top: 0;
  bottom: 0;
  left: -10px;
}

.ticket-opr .el-button:focus,
.ticket-opr .el-button:hover {
  color: #606266;
  background: #fff;
  border: 1px solid #dcdfe6;
}

.ticket-opr .el-button.is-disabled,
.ticket-opr .el-button.is-disabled:focus,
.ticket-opr .el-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}

.yun-box .grid-content {
  text-align: center;
  line-height: 36px;
  cursor: pointer;
}

.title {
  cursor: pointer;
}
.title:hover {
  text-decoration: underline;
}

.nav-bar {
  color: #999999;
  font-size: 12px;
  line-height: 34px;
  text-align: center;
}

.nav-bar span {
  padding: 0 10px;
  cursor: pointer;
}

.nav-bar span:last-child {
  cursor: default;
}

.nav-bar span:last-child:hover {
  color: #999999;
}
.nav-bar span:hover {
  color: #000;
}

.news-detail-content h1 {
  padding: 68px 0px 40px;
  font-family: "微软雅黑", "宋体";
  font-size: 24px;
  line-height: 30px;
  font-weight: normal;
  text-align: center;
}

.news-detail-content em {
  font-style: normal;
  font-weight: normal;
  color: #999999;
  font-size: 12px;
  line-height: 24px;
}

.news-detail-content .time {
  color: #999999;
  margin-right: 30px;
  font-size: 12px;
  line-height: 24px;
}
.news-detail-content .item-content {
  padding: 0 140px 20px;
}

.news-detail-content .info {
  padding-bottom: 10px;
  border-bottom: 1px solid #f4f4f4;
}

.news-detail-content .detail img {
  max-width: 700px;
  width: auto;
  overflow: hidden;
}

.news-detail-content .detail p {
  margin-bottom: 30px;
  line-height: 30px;
  color: #333333;
  font-size: 18px;
}
.news-item {
  cursor: pointer;
}
</style>

