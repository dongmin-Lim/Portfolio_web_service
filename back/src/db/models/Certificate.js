import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findById({ user_id }) {
    const certificate = await CertificateModel.findOne({ user_id: user_id });
    return certificate;
  }

  static async findPopulate({ user_id }) {
    const certificate = await CertificateModel.findOne({ user_id })
                          .populate("user_id")
                          .exec((err, data)=>{
                            console.log(data)
                          })
    return certificate;
  }

  static async findAll({ user_id }) {
    const certificates = await CertificateModel.find({ user_id: user_id });
    return certificates;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { user_id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  static async delete({ certificate_id }) {
    const certificate = await CertificateModel.deleteOne({ id: certificate_id })
    return certificate
  }
}

export { Certificate };
