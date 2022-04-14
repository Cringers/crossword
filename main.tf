locals {
  tenancy_ocid = "ocid1.tenancy.oc1..aaaaaaaavmv2tpgifuaqnjo7xmxqtgjkbo5i7lbdoe6jhzoef6wl74hcn6wq"
}

provider "oci" {
  tenancy_ocid = local.tenancy_ocid
  user_ocid = "ocid1.user.oc1..aaaaaaaa7jqvwjbhlarubmfz2v6cdgjaztlbuhhalqnngsc2avt7e23dgcxa" 
  private_key_path = "oracleidentitycloudservice_ethandeson-04-14-00-07.pem"
  fingerprint = "8b:12:cd:4d:66:64:62:82:11:8c:2c:93:8c:c0:e4:81"
  region = "us-phoenix-1"
}



resource "oci_identity_dynamic_group" "certificate_authority" {
    #Required
    compartment_id = local.tenancy_ocid
    description = "Dynamic group for Certificate Authority"
    matching_rule = "resource.type='certificateauthority'"
    name = "crossword"
}

data "oci_identity_users" "test_users" {
    #Required
    compartment_id = "ocid1.tenancy.oc1..aaaaaaaavmv2tpgifuaqnjo7xmxqtgjkbo5i7lbdoe6jhzoef6wl74hcn6wq"
}

output  "cringe" {
  value = data.oci_identity_users.test_users
}

