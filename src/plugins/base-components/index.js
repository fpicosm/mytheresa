import MyBlockquote from "@/components/global/Blockquote.vue";
import MyButton from "@/components/global/Button.vue";
import MyFixedButton from "@/components/global/FixedButton.vue";
import MyImage from "@/components/global/Image.vue";
import MyInput from "@/components/global/Input.vue";
import MyPagination from "@/components/global/Pagination.vue";
import MyProgressBar from "@/components/global/ProgressBar.vue";
import MyScroller from "@/components/global/Scroller.vue";
import MySelect from "@/components/global/Select.vue";
import MySeparator from "@/components/global/Separator.vue";
import MyTag from "@/components/global/Tag.vue";

export {
  MyBlockquote,
  MyButton,
  MyFixedButton,
  MyInput,
  MyPagination,
  MyProgressBar,
  MySelect,
  MySeparator,
  MyTag,
};

export default {
  install: (app) => {
    app.component("MyBlockquote", MyBlockquote);
    app.component("MyButton", MyButton);
    app.component("MyFixedButton", MyFixedButton);
    app.component("MyImage", MyImage);
    app.component("MyInput", MyInput);
    app.component("MyPagination", MyPagination);
    app.component("MyProgressBar", MyProgressBar);
    app.component("MySelect", MySelect);
    app.component("MyScroller", MyScroller);
    app.component("MySeparator", MySeparator);
    app.component("MyTag", MyTag);
  },
};
