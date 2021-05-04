import { Clip } from '@clipship/common';
import mongoose, { Document, Model } from 'mongoose';

const ClipSchema = new mongoose.Schema(
  {
    url: String,
    start: Number,
    end: Number,
    duration: Number,
    label: Boolean,
    labelContent: String || null,
    labelPosition: Number || null,
    labelGlobalPosition: Number || null,
    labelGlobal: Boolean,
    thumbnailUrl: String,
    title: String,
    broadcaster: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const ProjectSchema = new mongoose.Schema(
  {
    name: String || null,
    clips: [ClipSchema],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export interface Project {
  name: string | null;
  clips: Clip[];
}

export interface ProjectBaseDocument extends Project, Document {}

interface ProjectAttrs {
  name: string;
}

interface ProjectModel extends mongoose.Model<ProjectBaseDocument> {
  build(attrs: ProjectAttrs): ProjectBaseDocument;
  updateProject(id: string, attrs: ProjectAttrs): Promise<ProjectBaseDocument>;
  getProject(id: string): Promise<ProjectBaseDocument>;
  setClips(id: string, clips: Clip[]): Promise<ProjectBaseDocument>;
  deleteProject(id: string): Promise<ProjectBaseDocument>;
}

ProjectSchema.statics.build = (attrs: ProjectAttrs) => {
  return new Project(attrs);
};

ProjectSchema.statics.updateProject = async function (
  this: Model<ProjectBaseDocument>,
  id: string,
  attrs: ProjectAttrs
) {
  return this.findByIdAndUpdate({ _id: id }, attrs);
};

ProjectSchema.statics.getProject = async function (this: Model<ProjectBaseDocument>, id: string) {
  return this.findById(id);
};

ProjectSchema.statics.setClips = async function (
  this: Model<ProjectBaseDocument>,
  id: string,
  clips: Clip[]
) {
  return this.findByIdAndUpdate({ _id: id }, { clips });
};

ProjectSchema.statics.deleteProject = async function (
  this: Model<ProjectBaseDocument>,
  id: string
) {
  return this.findByIdAndDelete(id);
};

const Project = mongoose.model<ProjectBaseDocument, ProjectModel>('Project', ProjectSchema);
export default Project;
