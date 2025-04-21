if exists(select * from sys.procedures where name = 'updCompanyLocation')
begin
	drop proc updCompanyLocation;
end
go

create proc updCompanyLocation
	@company_id int,
	@address_id int,
	@isHQ bit

as 
	set nocount on;

	update company_location
	set isHQ = @isHQ
	where	company_id = @company_id
		and	address_id = @address_id;
	return 0;
go