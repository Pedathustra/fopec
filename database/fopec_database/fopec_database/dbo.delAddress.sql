if exists(select * from sys.procedures where name = 'delAddress')
begin
	drop proc delAddress;
end
go

create proc delAddress
	@id int
as 
	set nocount on;

	if exists(select * from company_location where address_id = @id)
	begin 
		return 1
	end

	delete from address where id = @id;

go